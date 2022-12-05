import { createStyles, makeStyles, Theme } from "@material-ui/core";

const customThemeStyles = makeStyles((theme: Theme) =>
  createStyles({
    customThemeSettings: {
      "& input": {
        fontFamily: "greycliff",
        outline: "0",
      },
      "& .MuiBox-root": {
        padding: "0",
      },
      "& .MuiAccordion-root:before": {
        display: "none",
      },
    },
    containerspace: {
      padding: "0 10px",
    },
    blueBtn: {
      minWidth: "90px",
      minHeight: "27px",
      borderRadius: "5px",
      boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.2)",
      backgroundColor: "#4890e8 !important",
      fontSize: "14px",
      fontWeight: "normal",
      color: "white",
      padding: "0",
    },
    topThemeTabs: {
      // backgroundColor:"red",
      "& .MuiBox-root-50": {
        margin: "0",
      },
      "&  .MuiAppBar-colorDefault": {
        backgroundColor: "white !important",
        boxShadow: "0 0 5px 0 rgb(0 0 0 / 50%)",
        "& .MuiTab-root.Mui-selected": {
          color: "#4890e8",
        },
        "&  .MuiTab-root": {
          minWidth: "inherit",
          fontSize: "18px",
          fontWeight: "600",
          color: "#909090",
          padding: "0",
          margin: "2px 20px",
        },
        "&  .MuiTabs-flexContainer": {
          justifyContent: "center",
        },
      },
    },
    bntTopRight: {
      "& button": {
        fontSize: "14px",
        fontWeight: 700,
        color: "#4890e8",
        padding: "0",
      },
    },
    closeBtnRight: {
      padding: "0",
      color: "#4890e8",
      minWidth: "inherit",
      marginLeft: "10px",
      // position: "absolute",
      // right: " 10px",
      "& svg": {
        fontSize: "16px !important",
      },
    },
    topButtons: {
      textAlign: "right",
      margin: "20px 10px 20px 0",
      "& button": {
        marginRight: "10px",
        fontWeight: 600,
      },
      "& button:first-child": {
        marginRight: "10px",
      },
    },
    parentCollaps: {
      "& .MuiAccordionSummary-root": {
        height: "40px",
        minHeight: "auto",
      },
      "& .MuiAccordionSummary-expandIcon": {
        color: "#909090",
      },
      "& .MuiAccordionSummary-root.Mui-expanded": {
        borderBottom: "solid 1px #ccc",
        boxShadow: " 0 2px 3px 0 rgb(0 0 0 / 10%)",
        borderBottomLeftRadius: "4px",
        borderBottomRightRadius: "4px",
      },
      "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
        color: "#0f3d75",
      },
    },
    parentCollapsText: {
      "& .MuiAccordionSummary-content": {
        margin: 0,
        justifyContent: "space-between",
        "& .MuiTypography-root": {
          fontSize: "18px",
          fontWeight: 900,
          color: "#1b2430",
        },
      },
      "& .MuiAccordionSummary-content.Mui-expanded": {
        "& .MuiTypography-root": {
          color: "#0f3d75",
        },
      },
    },
    TabsContentContainer: {
      "& .MuiPaper-rounded": {
        boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
        border: "solid 1px #ccc",
        backgroundColor: "#fff",
        margin: "10px 0 !important",
        borderRadius: "4px",
      },
    },
    innerAccordion: {
      borderRadius: "0  !important",
      border: "0 !important",
      "& .MuiAccordionSummary-content": {
        margin: "0 !important",
        justifyContent: "space-between",
        "& .MuiTypography-body1": {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#1b2430",
          paddingLeft: "5px",
        },
      },
      "& .MuiAccordionSummary-content.Mui-expanded": {
        "& .MuiTypography-body1": {
          color: "#0f3d75",
        },
      },

      "& .MuiAccordionSummary-root": {
        paddingRight: "10px",
        minHeight: "inherit",
        height: "30px",
        backgroundColor: "rgb(72 144 232 / 7%)",
        border: "0 !important",
        boxShadow: "none !important",
        "& svg": {
          fontSize: "20px",
        },

        [theme.breakpoints.down("sm")]: {},
      },
      "& .MuiAccordionDetails-root": {
        display: "block",
        padding: 0,
        marginTop: "10px",
        paddingLeft: "45px",
        paddingRight: "10px",
      },
    },
    listingWrp: {
      display: "flex",
      flexFlow: "wrap",
      width: "100%",
      marginBottom: "5px",
      alignItems: "center",
    },
    listingWrpADD: {
      display: "flex",
      flexFlow: "wrap",
      width: "100%",
      marginBottom: "15px",
    },
    listingTextBox: {
      // flex: 3,
      width: "25%",
      "& span": {
        fontSize: "14px",
        fontWeight: 500,
        // marginBottom:"10px",
        color: "#000",
        display: "flex",
        alignItems: "center",
        position: "relative",
        "& svg": {
          fontSize: "15px",
          fontWeight: "normal",
          color: "#ccc",
          marginLeft: "3px",
        },
      },
      "& div": {
        textAlign: "left",
      },
    },
    listingTextWrp: {
      maxWidth: "267px",
      display: "flex",
      position: "relative",
    },
    listingTextWrpSound: {
      maxWidth: "267px",
      display: "flex",
      position: "relative",
      float: "left",
    },
    listingTextNotes: {
      textAlign: "center",
      // flex: 2,
      width: "17%",
      "& span": {
        display: "block",
        fontSize: "14px",
        fontWeight: 300,
        color: "#000",
        marginBottom: "10px",
      },
      "& input": {
        maxWidth: "180px",
      },
    },
    listingTextNotesSounds: {
      textAlign: "center",
      // flex: 2,
      // float: "right",
      // marginRight: "-30px",
      width: '17%',
      "& span": {
        display: "block",
        fontSize: "14px",
        fontWeight: 300,
        color: "#000",
        marginBottom: "10px",
      },
      "& input": {
        maxWidth: "180px",
      },
    },
    listingUrl: {
      textAlign: "center",
      // flex: 3,]
      width: "15%",
      "& span": {
        display: "block",
        fontSize: "14px",
        fontWeight: 600,
        color: "#4890e8",
        marginBottom: "10px",
      },
      "& input": {
        maxWidth: "220px",
      },
    },
    listingUrlSound: {
      // display: "flex",
      // justifyContent: "center",
      // flex: 3,
      width: '19%',
      textAlign: "center",
      "& span": {
        display: "block",
        fontSize: "14px",
        fontWeight: 600,
        color: "#4890e8",
        marginBottom: "10px",
      },
      "& input": {
        maxWidth: "220px",
      },
    },
    editUrlBtns: {
      // flex: 2,
      width: "19%",
      textAlign: "right",
    },
    inputeditable: {
      // display:"none",
      textAlign: "center",
      "& input": {
        height: "25px",
        padding: "0 5px",
        borderRadius: "3px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        width: "100%",
      },
    },
    addChallangeList: {
      marginTop: "-5px",
      "& button": {
        padding: "0",
        justifyContent: "flex-start",
        fontSize: "14px",
        fontWeight: 500,
        color: "#4890e8",
        "& svg": {
          fontSize: "15px",
          marginRight: "5px",
        },
      },
    },
    addSectionRow: {
      paddingLeft: "30px",
      marginBottom: "10px",
      backgroundColor: "rgb(72 144 232 / 7%)",
      "& button": {
        padding: "0",
        justifyContent: "flex-start",
        fontSize: "14px",
        fontWeight: 700,
        color: "#4890e8",
        "& svg": {
          fontSize: "15px",
          marginRight: "5px",
        },
      },
    },
    AccordiontopHeaderText: {
      paddingLeft: "45px",
      paddingRight: "10px",
      position: "relative",
      top: "5px",
    },
    ChallangeName: {
      // flex: "3",
      width: "25%",
    },
    NotesText: {
      textAlign: "center",
      // flex: "2",
      width: "17%",
    },
    URLBox: {
      // flex: "3",
      width: "15%",
      textAlign: "center",
    },
    editUrlBX: {
      // flex: "2",
      width: "19%",
    },
    
    sampleText: {
      width: "12%",
      textAlign: "center",
    },
    sketchfileText: {
      width: "12%",
      textAlign: "center",
    },
    titleAccordion: {
      fontSize: "14px",
      color: "#ccc",
      fontWeight: 500,
    },
    inputField: {
      borderRadius: "3px",
      border: "solid 1px #ccc",
      backgroundColor: "#eef4ff",
      color: "#909090",
      fontSize: "14px",
      padding: " 5px 4px",
      minWidth: "350px",
    },
    colorMainWrp: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    colorMainWrpAdd: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    colorBoxContainer: {},
    typeName: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#000",
      display: "flex",
      alignItems: "center",
      margin: "0",
      minHeight: "21px",
      "& svg": {
        fontSize: "15px",
        fontWeight: "normal",
        color: "#ccc",
        marginLeft: "3px",
      },
    },
    colorFieldWrp: {
      display: "flex",
      // minWidth:"228px",
    },

    colorPickerWrp: {
      display: "flex",
    },

    colorPickerBox: {
      display: "block",
      width: " 25px",
      height: "25px",
      borderRadius: "5px",
      backgroundColor: "#f00",
      cursor: "pointer",
    },
    RGB: {
      fontSize: "16px",
      fontWeight: "normal",
      color: "#ccc",
      marginLeft: "7px",
      marginRight: "5px",
    },
    customColorValueField: {
      display: "flex",
    },
    brdrInput: {
      display: "flex",
      marginRight: "10px",
      border: "solid 1px #f2f2f2",
      borderRadius: "5px",
      "& input": {
        width: "37px",
        height: "25px",
        display: "block",
        border: "0",
        outline: 0,
        fontSize: "14px",
        color: "#000",
        padding: "0",
        borderRight: "solid 1px #f2f2f2",
        textAlign: "center",
      },
    },
    singleInputValue: {
      "& input": {
        width: "37px",
        height: "25px",
        display: "block",
        outline: 0,
        fontSize: "14px",
        color: "#000",
        padding: "0",
        border: "solid 1px #f2f2f2",
        textAlign: "center",
        borderRadius: "5px",
      },
    },
    previewCloseBox: {
      justifyContent: "space-around",
      display: "flex",
      position: "relative",
      top: "10px",
    },
    previewBtn: {
      fontSize: "14px",
      fontWeight: 700,
      color: "#4890e8",
      padding: "0",
    },
    perviewBtnBx: {},
    typeNameAdd: {
      "& input": {
        height: "25px",
        padding: "0 10px",
        borderRadius: "3px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        marginBottom: "5px",
        outline: "0",
        color: "black",
        width: "100%",
      },
    },
    soundMainWrp: {
      marginTop: "10px",
      marginBottom: "10px",
      paddingLeft: "45px",
      paddingRight: "10px",
    },
    playBTN: {
      padding: "0",
      color: "#4882bf",
      minWidth: "auto",
      "& svg": {
        fontSize: "29px",
      },
    },
    soundBTNRight: {
      display: "flex",
      flex: "2",
      justifyContent: "end",
    },
    Tooltip: {
      tooltip: {
        fontSize: "2em",
        color: "yellow",
        backgroundColor: "red",
      },
    },
    editURLSoundDiv: {
      marginRight:'20px',
    },
    playBTNSoundDiv: {
      minWidth: "50px",
      textAlign: "center",
      marginLeft: "15px",
    },
    closeBTNSound: {},
    uploadImageBx: {
      "& input": {
        display: "none",
      },
      "& .MuiButton-contained": {
        width: "100px",
        height: "25px",
        borderRadius: "5px",
        backgroundColor: "#4890e8",
        fontSize: "14px",
        color: "#fff",
        padding: "0",
        boxShadow: "none",
        fontWeight: "normal",
      },
    },

    spacingAround: {
      marginTop: "10px",
      marginBottom: "10px",
      paddingLeft: "45px",
      paddingRight: "10px",
    },
    aniLabel: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#909090",
      display: "flex",
      alignItems: "center",
      "& svg": {
        fontSize: "15px",
        fontWeight: "normal",
        color: "#ccc",
        marginLeft: "3px",
        verticalAlign: "middle",
      },
    },
    animationlisting: {},
    brdrBtm: {
      borderBottom: "1px solid #cccccc",
    },
    brdrRight: {},
    artWorkModal: {},
    mdlArt: {
      minWidth: "851px",
      padding: "1px 26px 10px 25px",
      borderRadius: "4px",
      boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.1)",
      border: "solid 1px #ccc",
      backgroundColor: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "& h2": {
        fontSize: "18px",
        fontWeight: 900,
        color: "#1b2430",
        margin: "10px 0",
      },
    },
    configTextArea: {
      "& textarea": {
        minHeight: "270px",
        width: "100%",
        outline: "0",
        borderRadius: "4px",
        backgroundColor: "#f0f0f0",
        color: "#000",
        fontSize: "14px",
        fontWeight: "normal",
        border: "0",
        padding: " 10px 10px",
        fontFamily: "greycliff",
      },
    },
    btnConfigDiv: {
      margin: "20px 0",
      "& button": {
        minWidth: "90px",
        minHeight: "27px",
        borderRadius: "5px",
        backgroundColor: "#4890e8 !important",
        fontSize: "14px",
        fontWeight: 500,
        color: "white",
        padding: "0 10px",
      },
    },
    imgPreviewMdl: {},
    colorPreWrp: {
      boxShadow: "0 4px 10px 0 rgb(0 0 0 / 50%)",
      borderRadius: "30px",
      //border: "5px solid #9538ffbf",
      background:
        "radial-gradient(circle, rgba(149,57,255,1) 28%, rgba(248,90,255,1) 100%)",
      width: "225px",
      height: "345px",
      margin: "auto",
      position: "relative",
    },
    imgPreviewMdlContainer: {
      borderRadius: "4px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
    perviewImgUrl: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1,
      color: "#fff",
      marginTop: "15px",
      display: "block",
    },
    closeColorMdl: {
      width: "20px",
      height: "20px",
      borderRadius: "10px",
      backgroundColor: "#c6c7ca",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: "-25px",
      top: "-20px",
      cursor: "pointer",
      "& svg": {
        fontSize: "15px",
        color: "black",
        fontWeight: "bolder",
        height: "14px",
      },
    },
    closeTextMdl: {
      width: "20px",
      cursor: "pointer",
      height: "20px",
      right: "4px",
      position: "absolute",
      top: "4px",
      fontWeight: "bold",
      "& svg": {
        fontSize: "20px",
      },
    },
    inputedLabel: {
      width: "200px",
      height: "25px",
      padding: "0 5px",
      borderRadius: "3px",
      backgroundColor: "#eef4ff",
      color: "black",
    },

    btmSectionBtns: {
      marginTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      "& button": {
        fontWeight: 500,
      },
      "& >div": {
        flex: "1",
      },
    },
    btmSectionbtnOne: {
      "& button": {
        background: "transparent",
        fontSize: "14px",
        fontWeight: 600,
        color: "#4890e8",
        "& svg": {
          width: "16px",
          height: "16px",
          marginRight: "5px",
        },
      },
      "& input": {
        display: "none",
      },
    },
    uploadfileBtn: {},

    rightBtmBxEnd: {
      display: "flex",
      justifyContent: "end",
      "& button": {
        padding: "0 15px",
        marginLeft: "15px",
      },
    },
    saveCancelBx: {
      marginRight: "40px",
    },
    progressBarSyle: {
      width: "10px",
      height: "10px",
      "&.MuiLinearProgress-colorPrimary": {
        backgroundColor: "transparent",
      },
    },
    DeployTestBx: {},
    heading: {
      marginLeft: "45px",
    },
    selectDiv: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },

    imgPrevWrp: {
      width: "500px",
      height: "500px",
      position: "relative",
      margin: "auto",
      "& img": {
        position: "absolute",
        left: "0",
        right: "0",
        margin: "auto",
        top: 0,
        bottom: 0,
        maxWidth: "100% !important",
        maxHeight: "100%",
      },
    },
    andIcnWrp: {
      position: "absolute",
      top: "2px",
      left: "-26px",
    },
    imgStyle: {
      width: "20px",
      height: "20px",
      marginLeft: "-13px",
      marginTop: "-4px",
    },
    btnProgress: {
      display: "flex",
      alignItems: "center",
    },
    circularProgress: {
      width: "20px !important",
      height: "20px !important",
      margin: "10px !importants",
    },
    audioStyle: {
      height: "30px",
      width: '250px',
      transform: 'scale(.9)',
      "&::-webkit-media-controls-enclosure": {
        borderRadius: "5px",
        backgroundColor: "transparent !important",
      },
    },
    stIcon: {
      top: "1px",
      color: "#FF4949",
      position: "absolute",
      fontSize: "20px",
      left: "-9px",
    },
    settingIcn: {
      top: "2px",
      color: "#FF4949 !important",
      position: "absolute",
      fontSize: "20px",
      left: "-20px",
    },
    sampleBx: {
      width: "12%",
      textAlign: "center",
    },
    sktchFileBx: {
      textAlign: "center",
      width: "12%",
    },

    DwnloadNewBtn: {
      position: "relative",
     
      "& img": {
        width: "25px",
      },
    },

    itemImgbx: {
      boxShadow: "0 2px 4px 0 rgb(0 0 0 / 40%)",
      // overflow: 'hidden',
      width: "95px",
      height: "205px",
      position: "absolute",
      zIndex: 9,
      right: "-95px",
      top: "0",
      marginLeft: "8px",
      marginTop: "10px",
      borderRadius: "4px",
      "& img": {
        position: "absolute",
        top: "0",
        bottom: "0",
        margin: "auto",
        width: "100%",
      },
    },
    closeitemmdl: {
      position: "absolute",
      top: "-5px",
      right: "-6px",
      background: "#0f3d75",
      width: "16px",
      height: "16px",
      borderRadius: "16px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",

      "& svg": {
        color: "white !important",
        verticalAlign: "middle !important",
        margin: "0 !important",
        fontSize: "14px !important",
      },
    },
    legandsBtns: {
      display: "flex",
      justifyContent: "space-between",
    },
    topHeadIcon: {
      "& :after": {
        content: "",
        width: "100%",
        display: "table",
      },
      "& ul": {
        listStyle: "none",
        paddingLeft: "10px",
        "& li": {
          width: "calc(100%/2)",
          float: "left",
          display: "flex",
          alignItems: "center",
          "& span": {
            marginRight: "10px",
            "& img": {
              display: "block",
            },
          },
          "& p": {
            margin: "0",
            fontSize: "14px",
            color: "#3c3c3c",
          },
        },
      },
    },
    bxone: {},
    emptydiv: {},
   
    closeEmpty:{    
      width:" 16px",
      height: '16px',
      marginLeft: '10px',
      border: '0',
      background: 'transparent',
      opacity: '0',
    },
    lastEmptyDiv:{
      
    },
    listingUrlSoundAudio:{width:'24%', textAlign: "center",},
    editUrlBXSound:{width:'24%',},
    URLBoxSound:{width:'19%', textAlign: "center",},
    listingUrlAnimation:{ width:'19%', textAlign: "center", },
  })
);

export default customThemeStyles;
