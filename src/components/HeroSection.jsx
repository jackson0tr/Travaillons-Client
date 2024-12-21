import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-5 my-10'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
                Rechercher, Postuler & <br /> Obtenez votre <span className='text-[#004aad]'>Emploi de rêve</span>
                </h1>
                <p className='text-sm sm:text-base text-gray-600 max-w-2xl mx-auto'>
                Relier des professionnels talentueux aux meilleurs employeurs à travers la France, Travaillons rend la recherche de votre emploi de rêve simple et efficace.
                </p>
                <div className='flex w-[60%] md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Trouver un emploi'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#004aad] hover:bg-[#005aad]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;
