import { useEffect } from "react";
//import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

//import {  filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from "../../actions";
//import {  fetchFilters } from "../../actions";
import { fetchFilters } from './filtersSlice';
import { filtersFetchingError, filterChanged } from "./filtersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    //const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    //с применением combineReducers:
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    //const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersFetchingError === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                        key={name}
                        id={name}
                        className={btnClass}
                        onClick={() => dispatch(filterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {/*<button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button>*/}
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;