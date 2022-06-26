import { useAppContext } from '../context/appContext'

const Alert = () => {
    const { alertType, alertText } = useAppContext()

    return (
        <div className={`alert alert-${alertType}`}>
            <span>{alertText}</span>
        </div>
    )
}

export default Alert