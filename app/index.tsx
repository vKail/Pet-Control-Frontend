import { LoginScreen } from "@/feature/auth/presentation/views/login-view"
import { verifyInstallation } from 'nativewind';
const Main = () => {
verifyInstallation();
    return <LoginScreen />
}

export default Main
