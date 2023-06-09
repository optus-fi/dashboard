import {useState, useCallback, useEffect} from 'react'


export const useCopyClick = () => {
    const [isCopied, setIsCopied] = useState(false)
    
    const copy = useCallback((text)=>{
        navigator.clipboard
        .writeText(text)
        .then(()=>{setIsCopied(true)})
        .catch( err => {
            console.error('Unable to copy text', err)
        })
                        
    },[])

    useEffect(()=>{
        if(isCopied){
            const timer = setTimeout(()=>{
                setIsCopied(false)
            }, 1500)
            return ()=>{clearTimeout(timer)}
        }
    },[isCopied])

    return {isCopied, copy}
}

