import { useUser } from '@clerk/clerk-expo';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = () => {

  const { user } = useUser()

  return (
    <SafeAreaView className='flex-1 bg-white justify-center items-center px-5 gap-5'>
      <Text className='text-4xl font-JakartaExtraBold'>Nafees Khan</Text>
    </SafeAreaView>
  );
};

export default Home;
