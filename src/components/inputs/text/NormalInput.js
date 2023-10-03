"use client";

import searchIconSvg from 'public/search-icon.svg'
import copyIconSvg from 'public/copy-icon.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function NormalInput({ value = "...", labelText, placeholder, attachSearchButton = false, attachCopyButton = false, readonly = false, tailwindWidth = 10, ...props }) {
    const [inputCurrentValue, setInputCurrentValue] = useState(value);

    useEffect(() => {
        setInputCurrentValue(value);
    }, [value]);

    const handleSearchTyping = (event) => {
        const string = event.target.value;

        if (
            string.length > 8 // Limite de caracteres
            || !/^\d*$/.test(string) // Teste (somente números)
        ) return false;

        setValue(string);
    }

    return (
        <div>
            {labelText && (
                <label htmlFor="search-input">{labelText}</label>
            )}
            <div className="flex flex-row items-start text-slate-800">
                <input id="search-input"
                    value={value}
                    onChange={handleSearchTyping}
                    type="text"
                    placeholder={placeholder}
                    className={
                        `w-${tailwindWidth}` + " transition-all py-1 px-2 outline-none border-b font-semibold h-8"
                        + (readonly ? " bg-slate-200 " : " bg-transparent focus:border-teal-200 ")
                        + ((attachSearchButton || attachCopyButton) ? " rounded-l " : " rounded ")
                    }
                    readOnly={readonly}
                />
                {attachSearchButton && (
                    <button className="border transition-all py-1 px-2 rounded-r w-10 max-h-8 relative active:border-teal-500 active:top-1" title='Pesquisar'>
                        <Image src={searchIconSvg} alt='search icon' className='h-6' />
                    </button>
                )}
                {attachCopyButton && (
                    <button className="border transition-all py-1 px-2 rounded-r w-10 max-h-8 relative active:border-teal-500 active:top-1" onClick={() => { navigator.clipboard.writeText(inputCurrentValue) }} title='Copiar'>
                        <Image src={copyIconSvg} alt='search icon' className='h-6' />
                    </button>
                )}
            </div>
        </div>
    )
}