"use client";

import NormalInput from "@/components/inputs/text/NormalInput";
import SearchInput from "@/components/inputs/text/SearchInput";
import { useEffect, useState } from "react";

export default function Home() {
    const [apiResponse, setApiResponse] = useState({});
    const [error, setError] = useState(null);

    const cepInputHandler = async (cep) => {
        var data = await fetch(`/api/cep?cep=${cep}`)
        data = await data.json();

        if (data.error) {
            setError(data.error);
            return false;
        }

        setError(null);
        setApiResponse(data.data);
    }

    return (
        <main className="flex flex-row justify-around items-center p-6 min-h-[100dvh]" style={{ background: "radial-gradient(circle, #569ae7 0%, #49ecbe 100%)" }}>
            <div className="
                    bg-[rgba(24,65,61,0.6)] border border-[rgb(148,163,184,0.1)] text-white
                    rounded-lg shadow-lg
                    backdrop:blur
                    w-96 p-5
            ">
                <div className="flex flex-col w-60">
                    <SearchInput handleCepInput={cepInputHandler} placeholder={"CEP"} labelText={"Digite o CEP"} attachButton={true} />
                    <small>Somente números</small>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                </div>
                <hr className="my-8" />
                <div className="my-2">
                    <NormalInput value={apiResponse?.logradouro} labelText={"Logradouro..."} attachCopyButton={true} tailwindWidth={"full"} readonly={true} />
                </div>
                <div className="my-2">
                    <NormalInput value={apiResponse?.complemento} labelText={"Complemento..."} attachCopyButton={true} tailwindWidth={"full"} readonly={true} />
                </div>
                <div className="my-2">
                    <NormalInput value={apiResponse?.bairro} labelText={"Bairro..."} attachCopyButton={true} tailwindWidth={"full"} readonly={true} />
                </div>
                <div className="flex flex-row gap-2 my-2">
                    <NormalInput value={apiResponse?.localidade} labelText={"Localidade..."} attachCopyButton={true} tailwindWidth={"full"} readonly={true} />
                    <NormalInput value={apiResponse?.uf} labelText={"UF"} attachCopyButton={true} tailwindWidth={10} readonly={true} />
                </div>
                <hr className="my-8" />
                <div>
                    <NormalInput value={apiResponse?.origin} labelText={"Origem dos dados"} tailwindWidth={"full"} readonly={true} />
                </div>
            </div>
        </main>
    )
}
