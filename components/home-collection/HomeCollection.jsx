'use client'
import React, { useRef, useState } from 'react'
import { Input } from 'reactstrap'
import CheckboxInput from '../formInput/CheckboxInput'
import '@/components/table/CustomFilter.css'
import PackageCardDesign from '../package-details/package-card/PackageCardDesign'
const HomeCollection = () => {

    const changeSearchValue = () => {

    }
    return (
        <div className='pt-3' style={{ backgroundColor: '#f1f6ee' }}>
            <div style={{ width: '92%', margin: '0 auto' }}>


                <div className='row '>
                    <div className='col-lg-3 col-md-3 col-sm-12  py-3' style={{ backgroundColor: 'white', border: '1px solid #dee2db', borderRadius: "10px" }}>

                        <div style={{ fontSize: '20px', color: '#1e1e2f' }}>
                            Filters
                        </div>
                        <div className='mb-2 mt-3'>
                            <SearchComponent changeSearchValue={changeSearchValue} />
                        </div>
                        <hr className='my-4 ' />

                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Select Type
                            </p>
                            <div style={{  }}>
                                {(select_type_list ?? []).map((item,index) => {
                                    return <FiltersList item={item} key={index}/>
                                })}

                            </div>
                        </div>

                        <hr className='my-4 ' />

                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Body Parts
                            </p>
                            <div style={{ height: '220px', overflowY: 'scroll' }}>
                                {(filter_body_list ?? []).map((item,index) => {
                                    return <FiltersList item={item} key={index} />
                                })}

                            </div>
                        </div>

                        <hr className='my-4 ' />
                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Health Conditions
                            </p>
                            <div style={{ height: '220px', overflowY: 'scroll' }}>
                                {(filter_health_list ?? []).map((item ,index) => {
                                    return <FiltersList item={item} key={index} />
                                })}

                            </div>
                        </div>
                    </div>

                    <div className='col-lg-9 col-md-9 col-sm-12 ps-4'>
                        <div className='mb-2'  style={{color:'#000',fontSize:'24px',fontWeight:'500'}}>
                             Packages and Tests
                        </div>
                        <div  className='mb-3'  style={{color:'#1e1e2f',fontSize:'18px'}}>
                            Showing 1-19 of 19 Packages
                        </div>

                        <div className='row'>
                            {(popular_test ?? []).map((keyValue,index) => {
                                return <PackageCardDesign listing={keyValue} lg={4} md={4}  key={index}/>
                            })}
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeCollection

const SearchComponent = ({ changeSearchValue }) => {
    const [searchValue, setSearchValue] = useState("");
    const debounceTimeoutRef = useRef(null);
    const onChangeHandler = (e) => {
        const newValue = e?.target?.value ?? "";
        setSearchValue(newValue);
        if (debounceTimeoutRef?.current) {
            clearTimeout(debounceTimeoutRef?.current);
        }
        // Set a new timeout
        debounceTimeoutRef.current = setTimeout(() => {
            if (newValue == "" || newValue.length > 3) {
                changeSearchValue(newValue);
            }
        }, 1000);
    };
    const onKeyPressHandler = (e) => {
        if (e?.key === "Enter" || e?.keyCode === 13 || e?.key === "Tab") {
            changeSearchValue(searchValue);
            if (debounceTimeoutRef?.current) {
                clearTimeout(debounceTimeoutRef?.current);
            }
        }
    };
    return (
        <div className="filter-search-div">
            <img
                src="/assets/icons/custom-tables/SearchIcon.svg"
                alt="Search Icon"
                className="search-icon"
            />
            <Input
                className="filter-search w-100"
                placeholder="Search"
                value={searchValue}
                onChange={onChangeHandler}
                onKeyDownCapture={onKeyPressHandler}
            />
            {typeof searchValue == "string" && searchValue.length > 0 && (
                <img
                    src="/assets/icons/custom-tables/ClearIcon.svg"
                    alt="Clear Icon"
                    className="clear-icon"
                    onClick={() => {
                        if (debounceTimeoutRef?.current) {
                            clearTimeout(debounceTimeoutRef?.current);
                        }
                        changeSearchValue("");
                        setSearchValue("");
                    }}
                />
            )}
        </div>
    );
};

const FiltersList = ({ item }) => {
    const [FilterCheck, setFilterCheck] = useState();
    return (

        <div className='mx-2'>


            <div className='d-flex '>
                <div ><CheckboxInput
                    check={FilterCheck}
                    setChecked={setFilterCheck}
                    label={''}
                />
                </div>

                <div >
                    {item.field}
                </div>
            </div>

        </div>

    )
}

let filter_body_list = [
    { field: 'Heart' },
    { field: 'Kidney' },
    { field: 'Liver' },
    { field: 'Thyroid' },
    { field: 'Brain' },
    { field: 'Intestines' },
    { field: 'Joints' },
    { field: 'Pancreas' },
    { field: 'Stomach' },
    { field: 'Muscle' },
    { field: 'Male Reproductive System ' },



]

let filter_health_list = [
    { field: 'Deabetes' },
    { field: 'Heart Diseses' },
    { field: 'Infection' },
    { field: 'Hypertension' },
    { field: 'Anemia' },
    { field: 'Cancer' },
    { field: 'Infertility' },
    { field: 'Fever' },
    { field: 'AIDS' },
    { field: 'Allergy' },
    { field: 'Obesity' },



]

let select_type_list = [
    { field: 'Package' },
    { field: 'Test' },
   



]

let popular_test = [{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },   
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' }

]