import { store } from '../../Store/store'
import uniqid from 'uniqid'
import { Link, useParams } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';

interface Props {
    active?: any;
    type: 'tokens' | 'pairs' | 'transactions' | 'filter_transactions' | 'buttonDex';
    flagTransaction?: boolean;
    data?: any;
    flagTokens?: boolean;
    arrButtons: string[];
    page?: string;
   

}

export const ButtonTokens = ( {active, type, data, arrButtons, page}: Props, ) => {

const {arrow, updateActiveButtonTokens, 
    sortTokens,
    updateArrow,  
     updateActiveButtonPairs, 
    sortPairs,updateActiveButtonTransaction, sortTransactions,
    updateFilterButton,
    updateActiveButtonDex,
    updateHandlerButtonDexBo} = store

    const matches = useMedia("(min-width: 1300px)")
    const {dex} = useParams()
    const a = typeof window.location.pathname.split('/')[2] == 'undefined' ? '' : `/${window.location.pathname.split('/')[2]}`


    const Arrownone = (button) => {
        if(button === active && arrow === 'high' && button !== 'Account' && type !== "filter_transactions" ) {return (<span key={uniqid()}>&dArr;</span>)}
        if(button === active && arrow === 'low' && button !== 'Account'  && type !== "filter_transactions") {return (<span key={uniqid()}>&uArr;</span>)}

        return 
    }    


    let style = type === 'pairs' ? !matches ? 'w-1/3 text-text  font-medium flex justify-center' : 'w-1/6 text-text  font-medium flex' :  "md:w-1/5 w-1/3 text-text  font-medium flex justify-center md:justify-start"  
    // if(type === 'pairs') {
    //     style = !matches ? 'w-1/3 text-text  font-medium flex justify-center' : 'w-1/6 text-text  font-medium flex'
    //  }

    const ButtonHeaderComponent = (button: string)=>{
        if(type === "tokens"){
            updateActiveButtonTokens(button)
            sortTokens(button, data)
            updateArrow()
        }
        if(type === "pairs") {
            updateActiveButtonPairs(button)
            sortPairs(button, data)
            updateArrow()
        }
        if(type === "transactions"){
            updateActiveButtonTransaction(button)
            sortTransactions(button, data)
            updateArrow()
        }
        if(type === "filter_transactions" ){
            updateFilterButton(button)
        }
        if(type === 'buttonDex'){
            updateActiveButtonDex(button)
            updateHandlerButtonDexBo(true)
        }

    }


    return (

        <>
        {arrButtons.map((button)=>{ 

         if(type == 'buttonDex') {
       
            return (
                <div key={uniqid()} onClick={()=>{ButtonHeaderComponent(button)}}  className={button === active ? style : "w-1/5 hover:text-inActive z-50" }>
                    <Link to={`${button}${page == '' ? '' : '/'}${page == '' ? a : page}`}> {button} </Link>
                </div>
            )

         } else {
            return (
                <button key={uniqid()}  
                        onClick={()=>{ButtonHeaderComponent(button)}} 
                        className={button === active ? style : type == 'pairs' ? !matches ? 'w-1/3 hover:text-inActive flex justify-center' :  'w-1/6 hover:text-inActive flex' : 'md:w-1/5 w-1/3 hover:text-inActive flex justify-center md:justify-start' }>
                                {button} {Arrownone(button)}
                       
                </button>)



         }
            


        })}
        </>
    )
}

