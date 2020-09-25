import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { RecordsResponse } from './types';
import {formatDate} from './helpers'
import Pagination from './Pagination';
import Filters from '../../components/Filters';



const BASE_URL = "http://localhost:8080"

const Records = () => {
  
    const [ recordsResponse, setRecordsResponse ] = useState<RecordsResponse>();
    const [activePage, setActivePage] = useState(0);
        
    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(response => setRecordsResponse(response.data));
    }, [activePage]);

    const handlePageChange = (index:number) => {
        setActivePage(index);
    }

    return (
        <div className="page-container">
            <Filters link="/charts" linkText="VER GRÁFICO" />
            <table className = "records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(item => (
                        <tr key={item.id}>
                          <td>{formatDate(item.moment)}</td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td className = "text-secondary">{item.gamePlatform}</td>
                          <td>{item.genreName}</td>
                          <td className = "text-primary">{item.gameTitle}</td>
                        </tr>
                    ))}                    
                </tbody>
    
            </table>
            <Pagination 
                activePage ={activePage}
                goToPage = {handlePageChange}
                totalPages = {recordsResponse?.totalPages}
            />
        </div>
    );
}

export default Records;