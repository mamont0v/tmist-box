import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPersonnel, updatePersonnel } from '../../../../redux/personnel/personnel.action'
import './PersonnelForm.styles.scss'

export const PersonnelForm = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch()
    const fetсhData = useSelector(state => state.personnelList)
    const { companies } = fetсhData
    const [inputs, handleInputs] = useState({
        companie: '',
        id: '',
        realname: '',
        username: '',
        position: '',
        email: '',
        domain: '',
        related_hardware: '',
        privilege_level: '',
        is_security_administrator: '',
        number_of_incidents: '',
        addition_info: ''
    })
    const person = useSelector(state => currentId ? state.personnelList.personnel.find(p => p._id === currentId) : null)


    useEffect(() => {
        if (person) handleInputs(person)
    }, [person])


    const handleSubmit = (event) => {
        event.preventDefault()
        if (currentId) {
            dispatch(updatePersonnel(currentId, inputs))
            clear()
        } else {
            dispatch(addPersonnel(inputs))
            clear()
        }
    }


    const clear = () => {
        setCurrentId(null)
        handleInputs(
            {
                companie: '',
                id: '',
                realname: '',
                username: '',
                position: '',
                email: '',
                domain: '',
                related_hardware: '',
                privilege_level: '',
                is_security_administrator: '',
                number_of_incidents: '',
                addition_info: ''
            }
        )
    }


    return (
        <div className="container">
            <h2>{currentId ? 'Изменить данные о  пользователе' : 'Создать нового пользователя'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="companie">Организация:</label>
                    <select value={inputs.companie} name="companie" onChange={(e) => handleInputs({ ...inputs, companie: e.target.value })}>
                        <option hidden defaultValue>Выберите</option>
                        {companies && companies.map(company => {
                            return <option key={company._id} value={company._id}>{company.title}</option>
                        })}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor="id">ID</label>
                    <input
                        name='id'
                        value={inputs.id}
                        type='text'
                        id='id'
                        autoComplete="off"
                        placeholder="ID пользователя"
                        onChange={(e) => handleInputs({ ...inputs, id: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label htmlFor="user">ФИО</label>
                    <input
                        name="realname"
                        value={inputs.realname}
                        autoComplete="off" placeholder="например: Иванов Иван Иванович"
                        onChange={(e) => handleInputs({ ...inputs, realname: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={inputs.username}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, username: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">Должность</label>
                    <input
                        name="position"
                        value={inputs.position}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, position: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">email</label>
                    <input
                        name="email"
                        value={inputs.email}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, email: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">Домен</label>
                    <input
                        name="domain"
                        value={inputs.domain}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, domain: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">Связанное оборудование</label>
                    <input
                        name="related_hardware"
                        value={inputs.related_hardware}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, related_hardware: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">Уровень привилегий</label>
                    <input
                        name="privilege_level"
                        value={inputs.privilege_level}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, privilege_level: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">Администратор безопасности</label>
                    <input
                        name="is_security_administrator"
                        value={inputs.is_security_administrator}
                        autoComplete="off" placeholder=""
                        onChange={(e) => handleInputs({ ...inputs, is_security_administrator: e.target.value })}>
                    </input>
                </div>
                <div className='form-group'>
                    <label htmlFor="user">Количество инцидентов</label>
                    <input
                        name="number_of_incidents"
                        value={inputs.number_of_incidents}
                        autoComplete="off" placeholder="Количесто?"
                        onChange={(e) => handleInputs({ ...inputs, number_of_incidents: e.target.value })}>
                    </input>
                </div>

                <div className='form-group'>
                    <label htmlFor="user">Дополнительная информация</label>
                    <textarea
                        name="addition_info"
                        value={inputs.addition_info}
                        autoComplete="off" placeholder="например: Семейное положение, льготы, время до работы"
                        onChange={(e) => handleInputs({ ...inputs, addition_info: e.target.value })}>
                    </textarea>
                </div>
                <div className='form-group'>
                    <button type="submit">
                        Создать пользователя
                    </button>
                </div>
            </form>
        </div>
    )
}