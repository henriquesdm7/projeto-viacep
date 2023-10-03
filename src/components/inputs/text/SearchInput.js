"use client";

import searchIconSvg from 'public/search-icon.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SearchInput({ labelText, placeholder, handleCepInput, attachButton = false, ...props }) {
    const [value, setValue] = useState("");

    const handleSearchTyping = (event) => {
        const string = event.target.value;

        if (
            string.length > 8 // Limite de caracteres
            || !/^\d*$/.test(string) // Teste (somente números)
        ) return false;

        setValue(string);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleCepInput(value);
        }
    }

    return (
        <>
            {labelText && (
                <label htmlFor="search-input">{labelText}</label>
            )}
            <div className="flex flex-row items-start ">
                <input id="search-input" value={value} onChange={handleSearchTyping} onKeyDown={handleKeyDown} type="text" placeholder={placeholder} className="w-40 transition-all rounded-l py-1 px-2 outline-none bg-transparent border-b focus:border-teal-200 font-semibold h-8" />
                {attachButton && (
                    <button className="border transition-all py-1 px-2 rounded-r w-10 max-h-8 relative active:border-teal-500 active:top-1" onClick={() => handleCepInput(value)} title='Pesquisar'>
                        <Image src={searchIconSvg} alt='search icon' className='h-6' />
                    </button>
                )}
            </div>
        </>
    )
}