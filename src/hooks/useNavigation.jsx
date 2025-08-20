import { useContext } from 'react';
import { NavigationContext } from '../provider/NavigationProvider';


export const useNavigation = () => useContext(NavigationContext);
