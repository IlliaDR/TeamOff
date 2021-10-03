import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=> ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title:{
        flexGrow:1
    },
    mainFeaturesPost:{
        position: "relative",
        color: theme.palette.common.white,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(4),
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    mainFeaturesPostContent:{
        position: "relative",
        padding: theme.spacing(3)
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundOverlay: "rgba(0,0,0,.9)"
    },
    cardMedia: {
        paddingTop: "20%"
    },
    cardContet: {
        flexGrow: 1
    },
    cardGrid: {
        marginTop: theme.spacing(4)
    }
}))

export default useStyles;