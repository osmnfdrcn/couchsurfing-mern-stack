import { useState } from "react";
import { useAppContext } from "../../context/appContext";

import Wrapper from "../../assets/wrappers/Profile";
import { FaCouch } from 'react-icons/fa'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlinePhotoCamera } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

import { SectionHeading } from "../../components/Headings";
import ProfileGeneralInfo from "../../components/ProfileGeneralInfo";
import ProfileHostingInfo from "../../components/ProfileHostingInfo";
import ProfileAvatar from "../../components/ProfileAvatar";
import ChangePassword from "../../components/ChangePassword";
import { Alert } from "../../components";

const Profile = () => {
    const { showAlert } = useAppContext();
    // show/hide user data on page
    const [showGeneralInfo, setShowGeneralInfo] = useState(false);
    const [showHostingInfo, setShowHostingInfo] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Wrapper>

            <div className="common-layout">

                {showAlert && <Alert />}
                <SectionHeading
                    onclick={() => setShowAvatar(!showAvatar)}
                    heading='PROFILE PHOTO'
                    icon={<MdOutlinePhotoCamera />}
                />

                {showAvatar && (
                    <ProfileAvatar
                        setShowGeneralInfo={setShowGeneralInfo}
                        setShowHostingInfo={setShowHostingInfo}
                        setShowAvatar={setShowAvatar}
                        setShowPassword={setShowPassword}

                    />
                )}
                <SectionHeading
                    onclick={() => setShowGeneralInfo(!showGeneralInfo)}
                    heading='GENERAL'
                    icon={<BsInfoCircle />}
                />
                {showGeneralInfo && (
                    <ProfileGeneralInfo
                        setShowGeneralInfo={setShowGeneralInfo}
                        setShowHostingInfo={setShowHostingInfo}
                        setShowAvatar={setShowAvatar}
                        setShowPassword={setShowPassword}
                    />
                )}

                <SectionHeading
                    onclick={() => setShowHostingInfo(!showHostingInfo)}
                    heading='HOSTING'
                    icon={<FaCouch />}
                />
                {showHostingInfo && (
                    <ProfileHostingInfo
                        setShowGeneralInfo={setShowGeneralInfo}
                        setShowHostingInfo={setShowHostingInfo}
                        setShowAvatar={setShowAvatar}
                        setShowPassword={setShowPassword}
                    />
                )}

                <SectionHeading
                    onclick={() => setShowPassword(!showPassword)}
                    heading='CHANGE PASSWORD'
                    icon={<RiLockPasswordLine />}
                />
                {showPassword && (
                    <ChangePassword
                        setShowGeneralInfo={setShowGeneralInfo}
                        setShowHostingInfo={setShowHostingInfo}
                        setShowAvatar={setShowAvatar}
                        setShowPassword={setShowPassword}
                    />
                )}
            </div>
        </Wrapper>
    );
};

export default Profile;
