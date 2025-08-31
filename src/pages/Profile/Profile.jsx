import React, { useState, useEffect, useRef } from "react";
import icons from "../../assets/images/images";
import ProfileSection from "./components/ProfileSection";
import SecuritySection from "./components/SecuritySection";
import { useProfile } from "../../provider/ProfileProvider";
import { updateUiSettingRequest } from "../../api/profileApi";

const Profile = () => {
    const { uiSettings, getProfile } = useProfile();
    const initialWidth = uiSettings?.sidebarWidth ?? 300;
    const [sidebarWidth, setSidebarWidth] = useState(initialWidth);

    const isResizing = useRef(false);
    const containerRef = useRef(null);

    const [activeItem, setActiveItem] = useState("Профиль");
    const navItems = ["Профиль", "Безопасность", "Персональные настройки"];

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing.current || !containerRef.current) return;
            const { left } = containerRef.current.getBoundingClientRect();
            const relativeX = e.clientX - left;
            const newWidth = Math.min(Math.max(relativeX, 200), 400);
            setSidebarWidth(newWidth);
        };

        const handleMouseUp = async () => {
            if (!isResizing.current) return;
            isResizing.current = false;

            try {
                const mergedSettings = {
                    ...uiSettings,
                    sidebarWidth
                };

                await updateUiSettingRequest({
                    uiSettings: JSON.stringify(mergedSettings)
                });
                await getProfile();
            } catch (err) {
                console.error("Ошибка при обновлении uiSettings:", err);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [sidebarWidth, uiSettings, getProfile]);

    return (
        <div className="profile" ref={containerRef}>
            <div
                className="profile__left"
                style={{ width: `${sidebarWidth}px`, position: "relative" }}
            >
                <div className="profile__left-title">
                    <img
                        src={icons.logo}
                        alt="логотип"
                        className="profile__left-logo"
                    />
                </div>
                <div className="profile__left-navbar">
                    {navItems.map((item) => (
                        <div
                            key={item}
                            className={`profile__left-item ${activeItem === item ? "profile__left-item--active" : ""
                                }`}
                            onClick={() => setActiveItem(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div
                    className="profile__resizer"
                    onMouseDown={() => {
                        isResizing.current = true;
                    }}
                />
            </div>
            <div className="profile__right">
                {activeItem === "Профиль" && <ProfileSection />}
                {activeItem === "Безопасность" && <SecuritySection />}
            </div>
        </div>
    );
};

export default Profile;
