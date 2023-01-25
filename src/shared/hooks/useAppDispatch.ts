import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app';

export const useAppDispatch = () => useDispatch<AppDispatch>();
