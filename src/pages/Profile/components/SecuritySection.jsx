// sections/ProfileSection.jsx
import { useEffect, useState } from "react";

const SecuritySection = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await fetch("/api/user/profile");
                // const data = await response.json();
                // setUserData(data);
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
            <div className="profile__right-title">Безопасность</div>
            <div className="profile__right-content">
                {loading ? (
                    <p>Загрузка данных...</p>
                ) : (
                    <>
                        <p>Имя: </p>
                        <p>Email: </p>
                        {/* другие поля */}
                    </>
                )}
            </div>
        </div>
    );
};

export default SecuritySection;
