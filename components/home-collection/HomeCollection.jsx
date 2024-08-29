'use client'
import React, { useRef, useState } from 'react'
import { Input } from 'reactstrap'
import CheckboxInput from '../formInput/CheckboxInput'
import '@/components/table/CustomFilter.css'
import PackageCardDesign from '../package-details/package-card/PackageCardDesign'
import useAPI from '@/hooks/useAPI'
import TestCardDesign from '../test-details/test-card/TestCardDesign'
const HomeCollection = () => {


    const [ListingFields, setListingFields] = useState();

    const [getBasicDetailsResponse, getBasicDetailsHandler] = useAPI(
        {
            url: "/getTestDetails",
            method: "get",
            sendImmediately: true,

        },
        (e) => {



            let TestConditionListing = (e?.TestConditionListing ?? []).map((item) => {
                return { label: item?.name, value: item?._id }
            })
            let BodyPartListing = (e?.BodyPartListing ?? []).map((item) => {
                return { label: item?.name, value: item?._id }
            })


            setListingFields({
                TestConditionListing: TestConditionListing, BodyPartListing: BodyPartListing,
            })



        },
        (e) => {

            //  transformErrorDefault(
            //     "Something went wrong while creating Test Case!",
            //     e
            // );
        }
    );




    const [allPackageResponse, allPackageHandler] = useAPI(
        {
            url: "/test/lists",
            method: "get",
            sendImmediately: true,
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                pageNo: 1,
                pageSize: 20,
                // searchQuery: searchValue,
            },
        },
        (e) => {




            let packageList = (e?.data ?? []).filter((item) => {
                return item.testType === 'Package'
            });

            let testList = (e?.data ?? []).filter((item) => {
                return item.testType === 'Test'
            });

            return { packageList: packageList, testList: testList }
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting tests!",
                e
            ));
            return e
        }
    );

    const [bodyPartValue, setBodyPartValue] = useState([])


// console.log(allPackageResponse);

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
                            <div style={{}}>
                                {(select_type_list ?? []).map((item, index) => {
                                    return <FiltersList item={item} key={index} />
                                })}

                            </div>
                        </div>

                        <hr className='my-4 ' />

                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Body Parts
                            </p>
                            <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                                {(ListingFields?.BodyPartListing ?? []).map((item, index) => {
                                    return <FiltersList item={item} key={index} setBodyPartValue={setBodyPartValue} />
                                })}
                            </div>
                        </div>

                        <hr className='my-4 ' />
                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Health Conditions
                            </p>
                            <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                                {(ListingFields?.TestConditionListing ?? []).map((item, index) => {
                                    return <FiltersList item={item} key={index} setBodyPartValue={setBodyPartValue} />
                                })}

                            </div>
                        </div>
                    </div>

                    <div className='col-lg-9 col-md-9 col-sm-12 ps-4'>
                        <div className='mb-2' style={{ color: '#000', fontSize: '24px', fontWeight: '500' }}>
                            Packages and Tests
                        </div>
                        <div className='mb-3' style={{ color: '#1e1e2f', fontSize: '18px' }}>
                            Showing 1-19 of 19 Packages
                        </div>

                        <div className='row'>
                            {(allPackageResponse?.data?.packageList ?? []).map((keyValue, index) => {
                                return <PackageCardDesign listing={keyValue} lg={4} md={4} key={index} />
                            })}


                            {(allPackageResponse?.data?.testList  ?? []).map((keyValue, index) => {
                                return <TestCardDesign listing={keyValue} lg={4} md={4} key={index} />
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

const FiltersList = ({ item, setBodyPartValue }) => {
    const [FilterCheck, setFilterCheck] = useState();



    return (

        <div className='mx-2'>


            <div className='d-flex '>
                <div ><CheckboxInput
                    check={FilterCheck}
                    setChecked={() => {
                        if (FilterCheck) {
                            setBodyPartValue(prev => {
                                let data = (prev ?? []).filter((value) => {
                                    if (value.value === item.value) {

                                    }
                                    else {
                                        return value
                                    }
                                })
                                return data

                            });

                        }
                        else {
                            setBodyPartValue(prev => [...prev, item]);

                        }

                        setFilterCheck(!FilterCheck)
                    }}
                    label={''}
                />
                </div>

                <div  >
                    {item.label}
                </div>
            </div>

        </div>

    )
}





let select_type_list = [
    { label: 'Package', label: 'Package' },
    { label: 'Test',label: 'Test' },




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