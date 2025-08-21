import { useContext } from 'react';

import { ProfileContext } from '../provider/ProfileProvider';

export const useProfile = () => useContext(ProfileContext);
