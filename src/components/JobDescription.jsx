import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
        <Navbar/>
        <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                    <h1 className="font-bold text-xl lg:text-2xl">{singleJob?.title}</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.postion} Postes</Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">{singleJob?.salary}Є</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg w-full lg:w-auto ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#004aad] hover:bg-[#005aad]'}`}>
                    {isApplied ? 'Déjà postulé' : 'Postuler maintenant'}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-lg lg:text-xl">Description du poste</h1>
            <div className="my-4 text-sm lg:text-base">
                <h1 className="font-bold my-2">Rôle: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-2">Lieu: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-2">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-2">Expérience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} années</span></h1>
                <h1 className="font-bold my-2">Salaire: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary}Є</span></h1>
                <h1 className="font-bold my-2">Nombre total de candidats: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
                <h1 className="font-bold my-2">Date de publication: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default JobDescription;
