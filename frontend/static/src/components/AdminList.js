import { useState, useEffect } from 'react';
import AdminDetail from './AdminDetail';

function AdminList() {
    const [adminView, setAdminView] = useState(null)

    const handleError = (err) => {
        console.log(err);
      }

    useEffect(() => {
        const getSiteArticles = async () => {
            const response = await fetch('/api/v1/articles/admin').catch(handleError);

            if (!response.ok) {
                throw new Error('Netword response was not OK!')
            } else {
                const data = await response.json();
                setAdminView(data);
            }
        }
        getSiteArticles();
    }, []);

    if (!adminView) {
        return <div>Fetching site data....</div>
    }

    const adminFilterSUB = adminView.filter(article => (
        article.phase === 'SUB'
    ))

    const adminSubmittedList = adminFilterSUB.map(article => (
        <AdminDetail key={article.id} {...article} handleError={handleError} adminView={adminView} setAdminView={setAdminView}/>
    ))

    const adminFilterREJ = adminView.filter(article => (
        article.phase === 'REJ'
    ))

    const adminRejectedList = adminFilterREJ.map(article => (
        <AdminDetail key={article.id} {...article} handleError={handleError} adminView={adminView} setAdminView={setAdminView}/> 
    ))

    const adminFilterPUB = adminView.filter(article => (
        article.phase === 'PUB'
    ))

    const adminPublishedList = adminFilterPUB.map(article => (
        <AdminDetail key={article.id} {...article} handleError={handleError} adminView={adminView} setAdminView={setAdminView}/> 
    ))

    const adminFilterARC = adminView.filter(article => (
        article.phase === 'ARC'
    ))

    const adminArchievedList = adminFilterARC.map(article => (
        <AdminDetail key={article.id} {...article} handleError={handleError} adminView={adminView}  setAdminView={setAdminView}/>    
    ))

    return (

        <div className='container'>
            <h2 className='sectionHead'>Submitted</h2>
                {adminSubmittedList}
            <h2 className='sectionHead'>Published</h2>
                {adminPublishedList}
            <h2 className='sectionHead'>Rejected</h2>
                {adminRejectedList}   
            <h2 className='sectionHead'>Archieved</h2>
                {adminArchievedList}
        </div>

    )
}
export default AdminList;