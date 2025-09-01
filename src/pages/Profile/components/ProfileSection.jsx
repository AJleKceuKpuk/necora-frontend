import { useEffect, useState } from "react";
import icons from "../../../assets/images/images";
import { useProfile } from "../../../provider/ProfileProvider";

const ProfileSection = () => {
    const { profile } = useProfile();

    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(profile.email);
    const [username, setUsername] = useState(profile.username);

    const [editMode, setEditMode] = useState({
        email: false,
        username: false,
    });

    const toggleEdit = (field) => {
        setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await fetch("/api/user/profile");
                // const data = await response.json();
                // setEmail(data.email);
                // setUsername(data.username);
            } catch (error) {
                console.error("Ошибка загрузки профиля", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="profile__right-page">
            <div className="profile__right-header">
                <div className="img-container img-45">
                    <img src={icons.profile} alt="profile" />
                </div>
                <div className="profile__right-title">Профиль</div>
            </div>

            <div className="profile__right-content">
                <div className="profile__right-wrapper">
                    <div className="profile__right-wrapper-header">
                        <div className="profile__right-wrapper-title">Имя пользователя</div>
                        <div
                            className="profile__right-wrapper__edit-button img-container img-36"
                            onClick={() => toggleEdit("username")}
                        >
                            <img src={icons.edit} alt="edit username" />
                        </div>
                    </div>
                    <div className="profile__right-wrapper-body">
                        {editMode.username ? (
                            <div className="profile__right-wrapper__edit-area">
                                <input
                                    className="profile__right-wrapper__input"
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Новое имя"
                                />
                                <button className="profile__right-wrapper__button profile__right-wrapper__button--submit img-container img-36">
                                    <img src={icons.submit} alt="edit username" />
                                </button>
                                <button
                                    onClick={() => toggleEdit("username")}
                                    className="profile__right-wrapper__button profile__right-wrapper__button--cancel img-container img-36"
                                >
                                    <img src={icons.cancel} alt="edit username" />
                                </button>
                            </div>
                        ) : (
                            <div className="profile__right-wrapper__text">{username}</div>
                        )}
                    </div>
                </div>

                <div className="profile__right-wrapper">
                    <div className="profile__right-wrapper-header">
                        <div className="profile__right-wrapper-title">E-mail</div>
                        <div
                            className="profile__right-wrapper__edit-button img-container img-36"
                            onClick={() => toggleEdit("email")}
                        >
                            <img src={icons.edit} alt="edit email" />
                        </div>
                    </div>
                    <div className="profile__right-wrapper-body">
                        {editMode.email ? (
                            <div className="profile__right-wrapper__edit-area">
                                <input
                                    className="profile__right-wrapper__input"
                                    type="text"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Новое имя"
                                />
                                <button className="profile__right-wrapper__button profile__right-wrapper__button--submit img-container img-36">
                                    <img src={icons.submit} alt="edit email" />
                                </button>
                                <button
                                    onClick={() => toggleEdit("email")}
                                    className="profile__right-wrapper__button profile__right-wrapper__button--cancel img-container img-36"
                                >
                                    <img src={icons.cancel} alt="edit email" />
                                </button>
                            </div>
                        ) : (
                            <div className="profile__right-wrapper__text">{email}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
