import axios from 'axios'
import { saveAs } from 'file-saver';
import { ContentLayout } from '../../../components/UI/ContentLayout/ContentLayout';
import { useState } from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
`;

const ProgressBar = styled.div`
    height: 100%;
    background-color: #00bcd4;
    text-align: center;
    line-height: 20px;
    color: #fff;
    transition: width 0.3s ease;
`;

export const CategorizationCommission = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const state = {}

    const createAndDownloadPDF = () => {
        setLoading(true);

        axios.post('/workflow/categorization-commission', state, {
            onUploadProgress: progressEvent => {
                const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentage);
            }
        })
            .then(() => axios.get('/workflow/categorization-commission', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'newPdf.pdf');
            })
            .catch(error => {
                // Обработка ошибок
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
                setProgress(0);
            });
    }

    return (
        <ContentLayout>
            <div>
                <h1>Создать приказ комиссии</h1>
                <button onClick={createAndDownloadPDF}>Создать приказ комиссии</button>

                {loading && (
                    <ProgressContainer>
                        <ProgressBar style={{ width: `${progress}%` }}>
                            <span>{`${progress}%`}</span>
                        </ProgressBar>
                    </ProgressContainer>
                )}
            </div>
        </ContentLayout>
    )
}