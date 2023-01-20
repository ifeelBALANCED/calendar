import { Background, Calendar } from 'components';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#fed766',
      }}
    >
      <Background />
      <div
        style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)' }}
      >
        <Calendar />
      </div>
    </div>
  );
};
