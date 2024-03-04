import './Login.styles.scss'
import { ContentLayout } from '../../components/UI/ContentLayout/ContentLayout'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

export const Login = () => {
    return (
        <ContentLayout>
            <div className="login">
                <h1>Выбрать метод авторизации:</h1>
                <div className='demo-card'>
                    <LoginForm />
                    <SignUpForm />
                </div>

            </div>

        </ContentLayout>
    )
}