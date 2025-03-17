import ProfileForm from './Components/ProfileForm';
import ProfileCard from '../../Components/UI/ProfileCard';

const ProfilePage = () => (
    <div style={styles.container}>
      <ProfileCard name="Zaira Silva" location="Querétaro, Querétaro" rating={5} />
      <ProfileForm onSubmit={(data) => console.log(data)} />
    </div>
  );
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Para que se alineen en la parte superior
      gap: '40px',
      marginTop: '40px', // Separación del header
    },
  };
  
  export default ProfilePage;