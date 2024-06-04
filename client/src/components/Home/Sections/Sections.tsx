import React from 'react'
import './Sections.css'
import {useState, useEffect} from 'react'
import Cards from './Cards/Cards'
import {useNavigate} from 'react-router-dom'

const Sections = () => {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const navigate = useNavigate();


    function getCurrentDimension(){
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);


        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const cardClick = (content:string) => {
        navigate(`/products/${content}`)
    }

    const getInfo = (i:number) =>{
        if(i===0) {
            return (
                <div className="box-container">
                    <div className="box-container">
                        <Cards title="Sports" content="Wide Variety of options from multiple sports to many famous athletes" available="12" functionCall={cardClick}/>
                    </div>


                </div>
            )
        } else if (i === 1) {
            return (
                <div className="box-container">
                <Cards title="Anime" content="Mutiple Anime options from different genres" available="12" functionCall={cardClick}/>
                </div>
            )
        } else if(i===2){
            return (
                <div className="box-container">
                    <Cards title="Movies" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )

        } else if(i===3){
            return (
                <div className="box-container">
                    <Cards title="Music" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )

        } else if(i===4){
            return (
                <div className="box-container">
                    <Cards title="Gaming" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )

        } else if(i===5){
            return (
                <div className="box-container">
                    <p className="middleText">Variety of  <span className="fancy">Choices</span></p>
                </div>
            )
        } else if (i ===6){
            return (
                <div className="box-container">
                    <Cards title="Books" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )

        } else if(i===7){
            return (
                <div className="box-container">
                    <Cards title="Art" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )


        } else if(i===8){
            return (
                <div className="box-container">
                    <Cards title="Tech" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )


        } else if(i===9){
            return (
                <div className="box-container">
                    <Cards title="Food" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )
        }else if(i===10){
            return (
                <div className="box-container">
                    <Cards title="Travel" content="Wide Variety of options from multiple genres" available="12" functionCall={cardClick}/>
                </div>
            )
        }
    }
    const getLength = (i:number) =>{
        if(i===5 ){
            return "col-span-2"
        }
        else{
            return "col-span-1"
        }
    }

    return (
        <>

                <div className="sectionContainer" id="skills">
                    <div className="grid auto-rows-[40vh] grid-cols-4 gap-4 box-c auto-cols-[20vw]">
                        {[...Array(11)].map((_, i) => (
                            <div
                                key={i}
                                className={`row-span-1 rounded-xl border-2 border-slate-400/10  p-4  ${
                                    getLength(i) 
                                }`}
                            >{getInfo(i)}</div>
                        ))}
                    </div>
                </div>

        </>


    )
}

export default Sections


