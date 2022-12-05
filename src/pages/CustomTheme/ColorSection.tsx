import {
  Accordion,
  AccordionDetails, AccordionSummary, Button, Modal, Snackbar, Tooltip, Typography
} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import {
  AddCircleOutlineRounded, Close, ExpandMore, HelpOutlineOutlined, Settings
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef, useState,forwardRef,useImperativeHandle } from "react";
import {
  useAppSelector
} from "../../common/hooks";
import ColorPalette from '../../components/ColorPalette';
import JSONModal from "../../components/JSONModal";
import customThemeStyles from "../../theme/customeThemeStyles";

//const Button = styled(MuiButton)<MuiButtonSpacingType>(spacing);




const ColorSection = forwardRef((props: any, ref: any) => {
  const [colorSection, setColorSection] = useState<any>([])
  const customThemeClasses = customThemeStyles();
  const [url, setUrl] = useState<any>()
  const [themeJSON, setThemeJSON] = useState<any>();
  const [errors, setErrors] = useState<string | null>(null)
  const [configuredValue, setConfiguredValue] = useState<any | null>(null)
  const [preview, setPreview] = React.useState(false);
  const [previewSample, setPreviewSample] = useState<boolean[]>([])
  const JSONImportModalRef = useRef<any>(null);
  const [snackBarSuccessText, setSnackBarSuccessText] = useState<string>('');
  const [snackBarErrorText, setSnackBarErrorText] = useState<string>('');
  const [snackBarInfoText, setSnackBarInfoText] = useState<string>('');
  const [display, setDisplay] = useState<string>('');
  const [importFlag, setImportFlag] = useState<string>('');
  const [JSONInPrettyFormat, setJSONInPrettyFormat] = useState<string>('');
  const [changedObjKey, setChangeObjkey] = useState<string[]>([])
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
      setColorSection(props.data)
      setTempData(props.data)
    } else {
      setColorSection([]);
    }
    if (props.validationData) {
      setThemeJSON(props.validationData)
    }
      
  }, [props.data, props.validationData]);
  
  
  useEffect(() => {
    if (errors === null) {
       
      JSONImportModalRef.current.closeModal()
      setErrors(null)
      if (configuredValue !== null) {
        const colorSorted = configuredValue.map((data: any) => {
          data.values = sortData(data?.values)
          return data
        })
        setColorSection(colorSorted)
        setSnackBarSuccessText('Configuration Replaced!');
      }
      let colours = [...colorSection]
    
    }
  }, [errors, configuredValue])
  const xportArt = async (str: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const fileName = "file";
    const json = JSON.stringify(colorSection, undefined, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const handlePaletteValue = (data: any, placeValue: number, keyName: any, outerIndex: number, index: number) => {
     
    if (data.R === undefined && data.G === undefined && data.B === undefined && data.A === undefined) {
          
    } else {
      let list = [...colorSection]
         
      list[outerIndex]['values'][index]['values'][placeValue] = `${data.R} ${data.G} ${data.B} ${data.A}`
      setColorSection(list)
      setChangeObjkey([...changedObjKey, keyName])
          
    }
       
  }
  //-----------------Enter key name------------------------------------
  const handleColorLayers = (e: any, index: number, key: string, idx: number) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        if (selectedApp) {
          let isValid = false;
          themeJSON.theme.colors.map((item: any) => {
            item.values.map((data: any) => {
              if (data.hasOwnProperty('key')) {
               
                if (e.target.value === data.key) {
                  isValid = true
                  let list = [...colorSection];
                  list[index]["values"][idx]["key"] = e.target.value;
                  list[index]["values"][idx]['size'] = data.size;
                  list[index]["values"][idx]['platform'] = data.platform;
                  
                  list[index]["values"][idx]['notes'] = data.notes;
                  list[index]["values"][idx]['required'] = data.required;
                  list[index]["values"][idx]['embedAtBuildTime'] = data.embedAtBuildTime;
                  setColorSection(list);
                }
              }
            })
            if (!isValid) {
              setSnackBarErrorText('This key is not valid, please try valid one.')
            }
            let colours = [...colorSection]
            const colorSorted = colours.map((data: any) => {
              data.values = sortData(data?.values)
              return data
            })
            setColorSection(colorSorted)
          })
        } else {
          setSnackBarErrorText('Please select game')
        }
          
      } else {
        setSnackBarErrorText('Plesae enter some value')
      }
          
    }
       
  }
  //-----------------------------To edit key name--------------------------------
  const handleEdit = (e: any, index: number, key: string, idx: number, data: any) => {
    let list = [...colorSection];
    const keyValue = data.key;
    list[index]['values'][idx]['key'] = '';
    setTimeout(() => {
      const element = document.getElementById(`input${index}${idx}`) as HTMLInputElement;
      if (element) {
        element.value = keyValue
      }
    }, 100)
     
     
    setColorSection(list);
    setSnackBarInfoText('Press Enter to save value')
  }
  //----------------------------------------key name-------------------------
  const handleColorChangeEvent = (e: any, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
         
      colorSection.forEach((data: any, idx: number) => {
        if (idx === index) {
          let list = [...colorSection];
          list[idx]['key'] = e.target.value;
          setColorSection(list);
        }
            
      })
    }
  }
  //------------------------Add color section---------------------------------
  const addColorSectionArt = (value: string) => {
    let data = {
      key: "",
      notes: "",
      required: false,
      embedAtBuildTime: false,
      platform: '',
      values: []
    }
    setColorSection([...colorSection, { ...data }]);
      
  }
  //------------------------------------Add color sub section------------------------------
  const addColorsSubSection = (value: any, index: number) => {
    let data = {
      key: "",
      notes: "",
      size: 0,
      required: false,
      embedAtBuildTime: false,
      platform: '',
      values: []
    }
    let key = value[0];
     
    let list = [...colorSection];
    list[index][`values`].push({ ...data })
    setColorSection(list);
    setSnackBarInfoText('Press Enter to save value')
  }
  //------------------------------------remove color values---------------------------------
  const handleRemoveColorItem = (index: number, idx: number, key: string) => {
    
       
      if (idx !== null || idx !== undefined) {
        let list = [...colorSection];
        list[index]['values'][idx].values = [''];
            
            
        
        setColorSection(list)
        console.log(key)
        const toRemoveDuplicate = [...changedObjKey]
        const array = toRemoveDuplicate.filter((c, index) => {
          return toRemoveDuplicate.indexOf(c) === index;
      });
       
        console.log(array)
        const keyIndex = array.indexOf(key)
        
        array.splice(keyIndex, 1)
        console.log(array)
        setChangeObjkey(array)
            
      }
    
  }
  const handleImport = (str: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setJSONInPrettyFormat(JSON.stringify(colorSection, undefined, 4));
        
    setImportFlag(str);
    if (JSONImportModalRef.current) {
      JSONImportModalRef.current.openModal()
    }
        
  }
  //--------------------------To preview color------------------------------
  const handlePreview = (str: string, data: any) => {
    if (data) {
      let arr: string[] = [];
      if (str === 'Artwork') {
        setDisplay(str);
        setPreview(true);
        setUrl(data)
      } else {
        
        data.map((x: any) => {
          x.split(' ').map((y: any) => {
            arr.push(y)
          })
        })
        switch (arr.length) {
          case 4:
            setUrl(`rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`)
            break;
          case 8:
            setUrl(`linear-gradient(rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]}),rgba(${arr[4]},${arr[5]},${arr[6]},${arr[7]}))`)
            break;
          case 12:
            setUrl(`linear-gradient(rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]}),
                rgba(${arr[4]} , ${arr[5]},${arr[6]},${arr[7]})
                ,rgba(${arr[8]} , ${arr[9]},${arr[10]},${arr[11]}))`)
            break;
          case 16:
            setUrl(`linear-gradient(rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]}),
                rgba(${arr[4]},${arr[5]},${arr[6]},${arr[7]})
                ,rgba(${arr[8]},${arr[9]},${arr[10]},${arr[11]})
                ,rgba(${arr[12]},${arr[13]},${arr[15]},${arr[15]}))`)
            break;
        }
            
         
        setDisplay(str);
        setPreview(true);
      }
    } else {
      setSnackBarInfoText('There is no information present')
        }
    
        
  }
  //-------------------------------To import from JSON modal----------------------
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
      const validatationData = themeJSON.theme.colors;
      let isError: any = [];
      let count = 0
      value.map((item: any) => {
        item?.values.map((data: any) => {
          validatationData.map((validItem: any) => {
            const response = validItem.values.filter((validData: any) => {
              return validData.key === data.key
            })
            if (response.length !== 0) {
              console.log(response)
              isError.push(response[0].key)
            }
          })
          count++
        })
      })
      console.log(count)
      if (isError.length !== count) {
        setErrors('Invalid key present in json')
      } else {
        let list = [...value]
        let keys = [...changedObjKey]
        list.map((data: any) => {
          colorSection.map((validate: any) => {
            if (data.key === validate.key) {
              data.values.map((item: any) => {
                validate.values.map((validateItem: any) => {
                  console.log(validateItem.values[0], item.values[0])
                  if (validateItem.values[0] !== item.values[0]) {
                  
                    keys.push(item.key)
                  }
                })
              })
            }
            
          })
        })
        setChangeObjkey(keys)
        setConfiguredValue(value)
      }
      
    }
  }
  const handleValidation = (data: any) => {
    let isValid = ""
  
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
        case 'platform':
          break;
        case 'size':
          break;
        case 'values':
          break;
        default:
          setErrors(`Invalid key entered in json - ${item}`)
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
  const handlePreviewSample = (outerIndex: number, innerIndex: number) => {
    let list = [...previewSample]
    list[parseInt(`${outerIndex}${innerIndex}`)] = true
    setPreviewSample(list)
  }
  const handleCloseSamplePreview = (outerIndex: number, innerIndex: number) => {
    let list = [...previewSample]
    list[parseInt(`${outerIndex}${innerIndex}`)] = false
    setPreviewSample(list)
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
          <Typography>Colors</Typography>
          <div className={customThemeClasses.bntTopRight}>
            <Button onClick={(e) => handleImport('Color', e)}>Import</Button>
            <Button onClick={(e) => xportArt('Color', e)}>Export</Button>
          </div>
        </AccordionSummary>
        {colorSection ? colorSection?.map((data: any, index: number) => (<Accordion key={index} className={customThemeClasses.innerAccordion}>
          <AccordionSummary
            key={index}
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            style={{ flexDirection: 'row-reverse' }}
            id="panel1a-header"
          >
            {data.key ? (<Typography>{data.key}</Typography>) : (<input placeholder="Type name" autoFocus className={customThemeClasses.inputedLabel} onKeyPress={(e: any) => handleColorChangeEvent(e, index)} />)}
            {/*<Button className={customThemeClasses.closeBtnRight} onClick={()=>handleRemoveColorItem(index)}><Close /></Button>*/}
          </AccordionSummary>

          <AccordionDetails>
            {data ? data?.values?.map((items: any, idx: number) => (
              <div key={idx}>
                <div className={customThemeClasses.listingTextWrp}>
                  {items.platform === 'android' ? <span className={customThemeClasses.andIcnWrp}><img className={customThemeClasses.imgStyle} src='/static/img/icons/androidIcon.png' /></span> : null}
                  {items.platform === 'ios' ? <span className={customThemeClasses.andIcnWrp}><img className={customThemeClasses.imgStyle} src='/static/img/icons/appleIcon.png' /> </span> : null}
                  {items.key ? (
                    <h3 style={changedObjKey.find(a => a === items.key) ? { color: 'green' } : { color: 'black' }} className={customThemeClasses.typeName}>{getEmbedIcon(items)}{items.key}<Tooltip
                      title={items.notes ? items.notes : 'No notes currently'}
                      placement="right-start"
                    ><span onClick={() => handlePreview("Artwork", items.appScreenshotURL)}><HelpOutlineOutlined /></span></Tooltip>{previewSample[parseInt(`${index}${idx}`)] ? (<div className={customThemeClasses.itemImgbx}><img src={items.appScreenshotURL} /><div className={customThemeClasses.closeitemmdl} onClick={() => handleCloseSamplePreview(index, idx)}><Close /></div></div>) : null}</h3>) : (<input style={{ marginBottom: '10px' }} id={`input${index}{idx}`} onKeyPress={(e: any) => handleColorLayers(e, index, data.key, idx)} />)}
                          
                </div>
                       
                      <div key={idx} className={customThemeClasses.colorMainWrp}>
                  {items.size === "1" ? (
                    <ColorPalette
                    palette={items.values[0] ? items.values[0] : undefined}
                    placeValue={0}
                    keyName={data.key}
                    outerIndex={index}
                      index={idx}
                      str={'Color'}
                    values={handlePaletteValue} />) :
                    (<>
                      <ColorPalette
                      palette={items.values[0]}
                      placeValue={0} keyName={items.key}
                      outerIndex={index}
                        index={idx}
                        str={'Color'}
                      values={handlePaletteValue} />
                      <ColorPalette
                        palette={items.values[1] ? items.values[1] : undefined}
                        placeValue={1}
                        keyName={items.key}
                        outerIndex={index}
                        index={idx}
                        str={'Color'}
                        values={handlePaletteValue} />
                      <ColorPalette
                        palette={items.values[2] ? items.values[2] : undefined}
                        placeValue={2}
                        keyName={items.key}
                        outerIndex={index}
                        index={idx}
                        str={'Color'}
                        values={handlePaletteValue} />
                      <ColorPalette
                        palette={items.values[3] ? items.values[3] : undefined}
                        placeValue={3}
                        keyName={items.key}
                        outerIndex={index}
                        index={idx}
                        str={'Color'}
                        values={handlePaletteValue} /></>)}
                        <div className={customThemeClasses.previewCloseBox}>
                          <div className={customThemeClasses.perviewBtnBx}>
                              <Button className={customThemeClasses.previewBtn}
                                onClick={() => handlePreview('Color', items.values)}>Preview</Button>
                               {items.values[0]? (<Button className={customThemeClasses.closeBtnRight}
                              onClick={() => handleRemoveColorItem(index,idx, items.key)}><Close /></Button>): (<button className={customThemeClasses.closeEmpty}></button>)}

                              
                          </div>
                          
                  </div>
                </div>
              </div>)) : null}
                  
            {/*<div className={customThemeClasses.addChallangeList}>
                      <Button onClick={() => addColorsSubSection(Object.keys(data), index)}>
                        <AddCircleOutlineRounded /> Add
                      </Button>
                            </div>*/}
          </AccordionDetails>
        </Accordion>)) : null}
        {/*<div className={customThemeClasses.addSectionRow}>
          <Button onClick={() => addColorSectionArt('')}>
            <AddCircleOutlineRounded /> Add Section
          </Button>
                          </div>*/}
      </Accordion>
      <Snackbar
        open={Boolean(snackBarErrorText)}
        autoHideDuration={3000}
        onClose={() => setSnackBarErrorText("")}
      >
        <Alert severity="error">{snackBarErrorText}</Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(snackBarSuccessText)}
        autoHideDuration={3000}
        onClose={() => setSnackBarSuccessText("")}
      >
        <Alert severity="success">{snackBarSuccessText}</Alert>
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
          {display === 'Color' ? (<div className={customThemeClasses.colorPreWrp} style={{ background: url ? url : 'white' }}>
            <span className={customThemeClasses.closeColorMdl} onClick={() => setPreview(false)}><Close />
            </span>
          </div>) : (<div>
            <figure className={customThemeClasses.imgPrevWrp}>
              <img style={{ maxWidth: "80%" }} src={url} />
            </figure>
            <span
              className={customThemeClasses.closeColorMdl}
              onClick={() => setPreview(false)}
            >
              <Close />
            </span>
          </div>)}
           
          <span className={customThemeClasses.perviewImgUrl}>{url}</span>
        </Box>
      </Modal>
      <JSONModal ref={JSONImportModalRef}
        data={JSONInPrettyFormat}
        heading={"Color"}
        handleExport={null}
        error={errors ? errors : null}
        xportArt={null}
        action={null}
        btnName={'Replace Config'}
        configuredValue={handleReplaceConfig}
        handlePaste={null}
      />
    </>
  )
});

export default ColorSection