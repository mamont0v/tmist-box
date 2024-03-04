import { ActivitiesForm } from "./ActivitiesForm/ActivitiesForm"
import { ActivitiesTable } from "./ActivitiesTable/ActivitiesTable"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getActivities } from '../../../redux/activities/activities.action'
import { ContentLayout } from "../../../components/UI/ContentLayout/ContentLayout"


export const Activities = () => {
    const dispatch = useDispatch()

    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getActivities())
    }, [currentId, dispatch])


    return (
        <ContentLayout>
            <h1>Процессы осуществления видов деятельности</h1>

            <h3>ПРАВИЛА КАТЕГОРИРОВАНИЯ ОБЪЕКТОВ КРИТИЧЕСКОЙ ИНФОРМАЦИОННОЙ ИНФРАСТРУКТУРЫ РОССИЙСКОЙ ФЕДЕРАЦИИ</h3>
            <br></br>
            <p>Определение процессов, в рамках выполнения функций (полномочий) или осуществления видов деятельности субъекта критической информационной инфраструктуры;
</p>
            <br></br>
            <p><b>Под определением процессов</b> понимаем выявление управленческих, технологических, производственных, финансово-экономических и (или) иных процессов в рамках выполнения функций (полномочий) или осуществления видов деятельности субъектов критической информационной инфраструктуры, нарушение и (или) прекращение которых может привести к негативным социальным, политическим, экономическим, экологическим последствиям, последствиям для обеспечения обороны страны, безопасности государства и правопорядка (далее - критические процессы);</p>
            <br></br>
            <h1>Критический процессы</h1>
            <p>К критическим нужно относить те процессы, нарушение нормального функционирования которых может привести к последствиям, указанным в Перечне показателей критериев значимости объектов КИИ (утв. постановлением Правительства РФ от 08.02.2018 № 127), и, соответственно, выделять конкретные объекты КИИ, c помощью которых автоматизируются указанные критические процессы.</p>

            <h1>Реестр бизнес-процессов</h1>
            <ActivitiesTable setCurrentId={setCurrentId} />


            <ActivitiesForm currentId={currentId} setCurrentId={setCurrentId} />
        </ContentLayout>
    )
}