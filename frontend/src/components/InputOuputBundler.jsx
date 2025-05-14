import React, { createContext, useEffect, useRef, useState } from 'react'
import Input from './Input'
import Output from './Output'

const ModalContext = createContext();

const InputOuputBundler = () => {
    const [openModel, setOpenModel] = useState(false)
    const contextValues = {
        openModel: openModel,
        setOpenModel: setOpenModel
    }


    const ref = useRef(null)
    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
    useEffect(() => {
        handleClick()
    }, [openModel]);

    return (
        <ModalContext.Provider value={contextValues}>
            <Input />
            <Output ref={ref}/>
        </ModalContext.Provider>
    )
}

export default InputOuputBundler
export { ModalContext }