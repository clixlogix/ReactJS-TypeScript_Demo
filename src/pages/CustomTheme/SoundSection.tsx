import {
  Accordion, AccordionSummary, Button, CircularProgress, Snackbar, Tooltip, Typography,Modal, Box
} from "@material-ui/core";
import {
  AddCircleOutlineRounded, Close, ExpandMore, HelpOutlineOutlined,Settings
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";
import {
  useAppSelector
} from "../../common/hooks";
import { getJrDomain, jrUtils } from "../../common/utils";
import JSONModal from "../../components/JSONModal";
import customThemeStyles from "../../theme/customeThemeStyles";

//const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);


const SoundSection = forwardRef((props: any, ref: any) => {
  const [soundSection, setSoundSection] = useState<any>([]);
  const customThemeClasses = customThemeStyles();
  const [errors, setErrors] = useState<string | null>(null)
  const [url, setUrl] = useState<any>()
  const [preview, setPreview] = React.useState(false);
  const [configuredValue, setConfiguredValue] = useState<any | null>(null)
  const [themeJSON, setThemeJSON] = useState<any>();
  const [previewSample, setPreviewSample] = useState<boolean[]>([])
  const [sound, setSound] = useState<any>('');
  const [progress, setProgress] = useState<number[]>([])
  const [snackBarSuccessText, setSnackBarSuccessText] = useState<string>('');
  const [snackBarErrorText, setSnackBarErrorText] = useState<string>('');
  const [snackBarInfoText, setSnackBarInfoText] = useState<string>('');
  const JSONImportModalRef = useRef<any>(null);
  const [display, setDisplay] = useState<string>('');
  const [importFlag, setImportFlag] = useState<string>('');
  const [JSONInPrettyFormat, setJSONInPrettyFormat] = useState<string>('');
  const [changedObjKey, setChangeObjkey] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const [tempData,setTempData] = useState<any>([]) 
  const { apps, gamesFromAllApps, selectedApp, selectedGame } = useAppSelector(
    (state) => state.gameConfigForm
  );
  const reset = () => {
   setChangeObjkey([])
  }
  useImperativeHandle(
    ref,
    () => {
      return {
        cancel: () => reset(),
          
      }
    },
  )
  useEffect(() => {
    if (props.data?.length !== 0) {
      setSoundSection(props.data)
    } else {
      setSoundSection([])
    }
    if (props.validationData) {
      setThemeJSON(props.validationData)
    }
  }, [props.data, props.validationData]);
  
 
  useEffect(() => {
    props.soudSectionData(soundSection)
  }, [soundSection])
  useEffect(() => {
    if (errors === null) {
    
       
      JSONImportModalRef.current.closeModal()
      setErrors(null)
      if (configuredValue !== null) {
        const soundsorted = sortData(configuredValue)
        setSoundSection(soundsorted)
        setSnackBarSuccessText('Configuration Replaced!');
      }
    }
  }, [errors, configuredValue])
  
  const xportArt = async (str: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    jrUtils.downloadJson(soundSection)
    /*const fileName = "file";
    const json = JSON.stringify(soundSection, undefined, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
  }
     
  const handleImport = (str: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setJSONInPrettyFormat(JSON.stringify(soundSection, undefined, 4));
        
    setImportFlag(str);
    if (JSONImportModalRef.current) {
      JSONImportModalRef.current.openModal()
    }
        
  }
  //------------------------------------Image preview----------------------------
  const handlePreview = (str: string, data: any) => {
    if (data) {
      setUrl(data);
    setDisplay(str);
    setPreview(true);
    } else {
      setSnackBarInfoText('There is no information present')
    }
    
  };
  const handleSoundSection = () => {
    let data = {
      key: "",
      notes: "",
      required: false,
      embedAtBuildTime: false,
      platform: '',
      values: []
    }
    setSoundSection([...soundSection, { ...data }])
    setSnackBarInfoText('Press Enter to save value')
  }
  
  const handleSoundItemChange = (e: any, index: number, str: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        let isValid = false;
        themeJSON?.theme.sounds.map((data: any) => {
          if (e.target.value === data.key) {
            isValid = true;
            let list = [...soundSection];
            list[index][str] = e.target.value;
            list[index]['size'] = data.size;
            list[index]['notes'] = data.notes;
            list[index]['required'] = data.required;
            list[index]['platform'] = data.platform;
            list[index]['embedAtBuildTime'] = data.embedAtBuildTime;
            setSoundSection(list);
          }
              
        })
        if (!isValid) {
          setSnackBarErrorText('This key is not valid, please try valid one.')
        }
        let sounds = [...soundSection]
        const soundsorted = sortData(sounds)
        setSoundSection(soundsorted)
      } else {
        setSnackBarErrorText('Please enter some value')
      }
         
           
    }
       
       
  }
  const handleEdit = (e: any, index: number, str: any, data: any) => {
    let list = [...soundSection];
        
    
    const keyValue = data.key;
    list[index][str] = '';
    setTimeout(() => {
      const element = document.getElementById(`soundKey${index}`) as HTMLInputElement;
      if (element) {
        element.value = keyValue
      }
    }, 100)
     
     
    setSoundSection(list);
    setSnackBarInfoText('Press Enter to save value')
  }
  
   
  const handleClickSoundItemChange = async (e: any, index: number, data: any) => {
      
    let list = [...soundSection];
    e.preventDefault();
    if (data.key) {
      let url = ""
      const file = e.target.files[0];
          
      const fileURL = URL.createObjectURL(file);
      const aux = new Audio();
      aux.src = fileURL;
          
      aux.addEventListener('loadedmetadata', async function () {
      
        var duration = aux.duration
        if (duration > parseFloat(data.size) - 1 && duration < parseFloat(data.size) + 1) {
          list[index]['values'][0] = await handleImageUpload(file, data.key, index);
          setSoundSection(list);
        } else {
          setSnackBarErrorText(`Please upload the file of duration ${data.size} seconds`)
        }
      }, false);
          
        
    } else {
      setSnackBarErrorText('Please enter key name first')
    }
        
  }
      
  const handleRemoveSoundItem = (index: number,key:string) => {
    let list = [...soundSection];
    list.splice(index, 1);
       
    
    setSoundSection(list)
    const array = [...changedObjKey]
        const keyIndex = array.indexOf(key)
        array.splice(keyIndex, 1)
        setChangeObjkey(array)
  }
  const handleImageUpload = async (selectedFile: File, key: string, index: number) => {
    if (!selectedFile) {
      setSnackBarErrorText('Please select file')
      return;
    } else {
      if (selectedFile.type === 'audio/mp3' || selectedFile.type === 'audio/mpeg') {
        
        const formData = new FormData();
        formData.append('uiCustomizationKey', key)
        formData.append("compulsoryForEmbedding", "true");
        formData.append('appId', selectedApp)
        formData.append('file', selectedFile);
        const response: any = await axios.post(
          `${getJrDomain()}unclassified/admin-api/apps/uploadFileForHarnessAssets`,
          formData,
          {
            withCredentials: true,// todo move this to interceptor
            onUploadProgress: (progressEvent: any) => {
              const { loaded, total } = progressEvent
              const prog = Math.floor(loaded * 100 / total)
              let list = [...progress]
              list[index] = prog
              setProgress(list)
            },
          }
        );
             
        if (response?.data?.message === "success") {
          return response?.data?.url;
        }
        else {
           
          setSnackBarErrorText('File not uploaded')
        }
            
      } else {
        setSnackBarErrorText('Please select valid file type - mp3')
      }
    }
      
  };
  const handleReplaceConfig = (value: any) => {
    setErrors(null)
    if (value.length !== 0) {
      value.map((item: any) => {
        
        handleValidation(Object.keys(item))
          
        item.values.map((data: any) => {
          if (data.hasOwnProperty('key')) {
            handleValidation(Object.keys(data))
          }
        })
         
      })
      const validatationData = themeJSON.theme.sounds;
      let isError: any = [];
      let count = 0
      value.map((data: any) => {
        const response = validatationData.filter((validData: any) => {
          return validData.key === data.key
        })
        if (response.length !== 0) {
      
          isError.push(response[0].key)
             
        }
        count++
      })
  
      if (isError.length !== count) {
        setErrors('Invalid key present in json')
      } else {
        let list = [...value]
        let keys = [...changedObjKey]
        list.map((data: any) => {
          soundSection.map((validate: any) => {
            if (data.key === validate.key) {
              
              if (validate.values[0] !== data.values[0]) {
                  
                keys.push(data.key)
              }
             
            }
            
          })
        })
        setChangeObjkey(keys)
        setConfiguredValue(value)
      }
        
    }
  }
  const handlePreviewSample = (outerIndex: number) => {
    let list = [...previewSample]
    list[parseInt(`${outerIndex}`)] = true
    setPreviewSample(list)
  }
  const handleCloseSamplePreview = (outerIndex: number) => {
    let list = [...previewSample]
    list[parseInt(`${outerIndex}`)] = false
    setPreviewSample(list)
  }
  const handleValidation = (data: any) => {
    let isValid = false
    data.map((item: any) => {
      switch (item) {
        case 'key':
          break;
        case 'notes':
          break;
        case 'required':
          break;
        case 'embedAtBuildTime':
          break;
        case 'size':
          break;
        case 'values':
          break;
        case 'platform':
          break;
        default:
          setErrors(`Invalid key entered in json - ${item}`)
          isValid = true;
          break;
      }
    })
     
  }
  const getEmbedIcon = (items: any) => {
    if (items.required === true && items.embedAtBuildTime === true) {
      return (<Settings className={customThemeClasses.settingIcn} />)
    }
    if (items.required === false && items.embedAtBuildTime === true) {
      return (<Settings className={customThemeClasses.settingIcn} />)
    }
    if (items.required === true && items.embedAtBuildTime === false) {
      return (<div className={customThemeClasses.stIcon} >*</div>)
    }
    if (items.required === false && items.embedAtBuildTime === false) {
      return null;
    }
  }
  const sortData = (value: any) => {
    var embededRequire = value.filter((data: any) => { if (data.embedAtBuildTime == true && data.required == true) return data })
    var embed = value.filter((data: any) => { if (data.embedAtBuildTime == true && data.required == false) return data })
    var require = value.filter(function (data: any) { if (data.embedAtBuildTime == false && data.required == true) return data })
    var non = value.filter(function (data: any) { if (data.embedAtBuildTime == false && data.required == false) return data })
    return embededRequire.concat(embed).concat(require).concat(non)
  }
  return (
      <>
       <Accordion className={customThemeClasses.parentCollaps}>
                <AccordionSummary className={customThemeClasses.parentCollapsText}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  style={{ flexDirection: 'row-reverse' }}
                  id="panel1a-header"
                >
                  <Typography>Sounds</Typography>
                  <div className={customThemeClasses.bntTopRight}>
                    <Button onClick={(e)=>handleImport('Sound',e)}>Import</Button>
                    <Button onClick={(e)=>xportArt('Sound',e)}>Export</Button>
                  </div>
                </AccordionSummary>
                <div className={customThemeClasses.brdrBtm}>
                  <div className={customThemeClasses.AccordiontopHeaderText}>
                    <div className={customThemeClasses.listingWrp}>
                      <div className={customThemeClasses.ChallangeName}>
                        <span className={customThemeClasses.titleAccordion}>Name</span>
                      </div>
                      <div className={customThemeClasses.NotesText} >
                        <span className={customThemeClasses.titleAccordion}>Duration</span>
                      </div>
                      <div className={customThemeClasses.URLBoxSound} >
                        <span className={customThemeClasses.titleAccordion}>URL</span>
              </div>
              
                      <div className={customThemeClasses.editUrlBXSound} style={{ textAlign: 'center'}}>
                        <span className={customThemeClasses.titleAccordion}>Sample</span>
                      </div>
                      <div className={customThemeClasses.lastEmptyDiv} >
                      </div>
                    </div>
                  </div>
                </div>
                <div className={customThemeClasses.soundMainWrp}>
                  {soundSection ? soundSection?.map((data: any, index: number) => (
                    <div key={index} className={customThemeClasses.listingWrp}>
                      <div className={customThemeClasses.listingTextBox}>
                        <div className={customThemeClasses.listingTextWrpSound}>
                        {data.platform === 'android' ? <span className={customThemeClasses.andIcnWrp}><img className={customThemeClasses.imgStyle} src='/static/img/icons/androidIcon.png' /></span> : null}
                            {data.platform === 'ios' ? <span className={customThemeClasses.andIcnWrp}><img className={customThemeClasses.imgStyle} src='/static/img/icons/appleIcon.png' /> </span> : null}
                        {data.key ? (
                          <span style={changedObjKey.find(a=> a === data.key) ? {color: 'green'}: {color: 'black'} }> {getEmbedIcon(data)}{data.key}
                                <Tooltip title={data.notes? data.notes: 'No notes currently'} placement="right-start">
                                  <span  onClick={() => handlePreview("Artwork", data.appScreenshotURL)}><HelpOutlineOutlined /></span>
                              </Tooltip>
                              {previewSample[parseInt(`${index}`)] ? (<div className={customThemeClasses.itemImgbx}><img src={ data.appScreenshotUR} /><div className={customThemeClasses.closeitemmdl} onClick={()=>handleCloseSamplePreview(index)}><Close/></div></div>):null}
                              </span>) : (<div className={customThemeClasses.inputeditable}>
                           <input placeholder="Type name" id={`soundKey${index}`} onKeyPress={(e: any)=> handleSoundItemChange(e,index,'key') }/>
                              </div>)}
                      </div>
                      
                      
                          </div>
                          <div className={customThemeClasses.listingTextNotesSounds}>
                          {data.size ? (<span >{data.size}</span>) :
                              (<div className={customThemeClasses.inputeditable}>
                                <input placeholder="Type duration" onKeyPress={(e: any)=> handleSoundItemChange(e,index,'notes') }/>
                              </div>)}
                        </div>
                      <div className={customThemeClasses.listingUrlSound} style={{display : 'flex'}}>
                      {progress[index] !== 0  ? progress[index] === 100?null: (<CircularProgress variant="determinate" className={customThemeClasses.progressBarSyle} value={progress[index]} />):null}
                        {data.values[0] ? (<audio className={customThemeClasses.audioStyle} controls src={data.values[0]}></audio>) :
                              null}
                      </div>
                      <div className={customThemeClasses.listingUrlSoundAudio} >
                    
                        {data.sample ? (<audio className={customThemeClasses.audioStyle} controls src={data.sample[0]}></audio>) :
                              null}
                        </div>
                      
                     
              <div className={customThemeClasses.soundBTNRight}>
                <div className={customThemeClasses.editURLSoundDiv}>
                       
                  <label className={customThemeClasses.uploadImageBx} htmlFor={`audio${index}`}>
                    <input id={`audio${index}`} accept='audio/mp3' type="file" onChange={(e: any) => handleClickSoundItemChange(e, index, data)} />
                    <Button variant="contained" component="span">
                      Upload mp3
                    </Button>
                  </label>
                </div>
                       
                             
                         <div className={customThemeClasses.closeBTNSound}>
                  {data.values[0] ? (<Button className={customThemeClasses.closeBtnRight} onClick={() => handleRemoveSoundItem(index,data.key)}><Close /></Button>) : (<button className={customThemeClasses.closeEmpty}></button>)}

                </div>
              </div>
            </div>)) : null}
          {/*<div className={customThemeClasses.addChallangeList}>
            <Button onClick={() => handleSoundSection()}>
              <AddCircleOutlineRounded /> Add
            </Button>
                            </div>*/}
        </div>
      </Accordion>
      <Snackbar
        open={Boolean(snackBarErrorText)}
        autoHideDuration={3000}
        onClose={() => setSnackBarErrorText('')}
      >
        <Alert severity="error">
          {snackBarErrorText}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(snackBarSuccessText)}
        autoHideDuration={3000}
        onClose={() => setSnackBarSuccessText('')}
      >
        <Alert severity="success">
          {snackBarSuccessText}
        </Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(snackBarInfoText)}
        autoHideDuration={5000}
        onClose={() => setSnackBarInfoText('')}
      >
        <Alert severity="info">
          {snackBarInfoText}
        </Alert>
      </Snackbar>
      <Modal
        open={preview}
        onClose={() => setPreview(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={customThemeClasses.imgPreviewMdlContainer}>
          <div>
            <figure className={customThemeClasses.imgPrevWrp}>
              <img style={{ maxWidth: "80%" }} src={url} />
            </figure>
            <span
              className={customThemeClasses.closeColorMdl}
              onClick={() => setPreview(false)}
            >
              <Close />
            </span>
          </div>
          <span className={customThemeClasses.perviewImgUrl}>{url}</span>
        </Box>
      </Modal>
      <JSONModal ref={JSONImportModalRef}
        data={JSONInPrettyFormat}
        heading={"Sound"}
        handleExport={null}
        error={errors ? errors : null}
        xportArt={null}
        action={null}
        btnName={'Replace Config'}
        configuredValue={handleReplaceConfig}
        handlePaste={null}
      /></>
  )
});

export default SoundSection