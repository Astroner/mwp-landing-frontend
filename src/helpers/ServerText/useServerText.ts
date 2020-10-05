import { useCallback, useContext, useMemo } from "react"
import ServerTextContext from "./ServerTextContext"

const useServerText = () => {
    const context = useContext(ServerTextContext);

    const text = useCallback((key: string) => {
        if(!context) return "";
        
        return context.lngMap[key].value || key;

    }, [context])

    const switchLng = useCallback((lng: string) => {
        if(!context) return 
        context.switchLng(lng);
    }, [context])
    
    const languages = useMemo(() => {
        if(!context) return []
        return context.languages
    }, [context])

    return { text, switchLng, languages };
}

export default useServerText