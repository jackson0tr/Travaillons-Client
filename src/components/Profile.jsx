import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-lg sm:text-xl">{user?.fullname}</h1>
                            <p className="text-sm sm:text-base">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className="self-start sm:self-center"
                        variant="outline"
                    >
                        <Pen />
                    </Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2 text-sm sm:text-base">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2 text-sm sm:text-base">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className="text-sm sm:text-base font-semibold">Compétences</h1>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge key={index}>{item}</Badge>
                            ))
                        ) : (
                            <span>Aucune compétence</span>
                        )}
                    </div>
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="text-sm sm:text-md font-bold">CV</Label>
                    {isResume ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user?.profile?.resume}
                            className="text-blue-500 w-full hover:underline cursor-pointer"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span>Pas de CV</span>
                    )}
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl mt-5 p-4 sm:p-8">
                <h1 className="font-bold text-lg sm:text-xl mb-5">Emplois postulés</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
