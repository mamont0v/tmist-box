import { PersonnelTable } from './PersonnelTable/PersonnelTable'
import { PersonnelForm } from './PersonnelForm/PersonnelForm'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPersonnel } from '../../../redux/personnel/personnel.action'
import { ContentLayout } from '../../../components/UI/ContentLayout/ContentLayout'

export const Personnel = () => {
    const dispatch = useDispatch()

    const [currentId, setCurrentId] = useState(null)


    useEffect(() => {
        dispatch(getPersonnel())
    }, [currentId, dispatch])

    return (
        <ContentLayout>
            <h1>Персонал</h1>
            <PersonnelTable setCurrentId={setCurrentId} />
            <PersonnelForm currentId={currentId} setCurrentId={setCurrentId} />
        </ContentLayout>
    )
}