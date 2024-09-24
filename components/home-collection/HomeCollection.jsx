'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input, Spinner } from 'reactstrap'
import CheckboxInput from '../formInput/CheckboxInput'
import '@/components/table/CustomFilter.css'
import PackageCardDesign from '../package-details/package-card/PackageCardDesign'
import useAPI from '@/hooks/useAPI'
import TestCardDesign from '../test-details/test-card/TestCardDesign'
import toast from 'react-hot-toast'
import transformErrorDefault from '@/utils/transformErrorDefault'
import '@/components/test&packages/health-package-component/health-package.css'
 const HomeCollection = () => {


    const [ListingFields, setListingFields] = useState();
    const [InputSearch, setInputSearch] = useState();
    const [locationSelected, setlocationSelected] = useState();
 
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
            url: "/test/list",
            method: "get",
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                pageNo: 1,
                pageSize: 20,
                // searchQuery: searchValue,
            },
        },
        (e) => {

            console.log(e);

            if ((typeValue ?? []).length === 0 || (typeValue ?? []).length === 2) {
                let packageList = (e?.data ?? []).filter((item) => {
                    return item.testType === 'Package'
                });

                let testList = (e?.data ?? []).filter((item) => {
                    return item.testType === 'Test'
                });

                return { packageList: packageList, testList: testList }
            }

            else {


                let containsPackage = typeValue.some(item => { return item.label === 'Package' });



                let containsTest = typeValue.some(item => item.label === 'Test');

                if (containsPackage) {
                    let packageList = (e?.data ?? []).filter((item) => {
                        return item.testType === 'Package'
                    });


                    return { packageList: packageList, testList: [] }
                }

                if (containsTest) {
                    let testList = (e?.data ?? []).filter((item) => {
                        return item.testType === 'Test'
                    });

                    return { packageList: [], testList: testList }
                }
            }



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
    const [ConditionsValue, setConditionsValue] = useState([])
    const [typeValue, settypeValue] = useState([])

    // console.log(bodyPartValue,ConditionsValue);

    useEffect(() => {

 

        if (!locationSelected) {
            let data = JSON.parse(localStorage.getItem("selectedLocation"));

            setlocationSelected(data)

                allPackageHandler({
                    params: {

                        pageNo: 1,
                        pageSize: 20,
                        searchQuery: InputSearch,
                        location:  data?.selectedLocation ?? null,
                        bodyPartsIds: bodyPartValue ? JSON.stringify((bodyPartValue ?? []).map((item) => { return item.value })) : [],
                        conditionIds: ConditionsValue ? JSON.stringify((ConditionsValue ?? []).map((item) => { return item.value })) : [],

                    }
                })
            }

            else {
                allPackageHandler({
                    params: {

                        pageNo: 1,
                        pageSize: 20,
                        searchQuery: InputSearch,
                        location: locationSelected ?? null,
                        bodyPartsIds: bodyPartValue ? JSON.stringify((bodyPartValue ?? []).map((item) => { return item.value })) : [],
                        conditionIds: ConditionsValue ? JSON.stringify((ConditionsValue ?? []).map((item) => { return item.value })) : [],

                    }
                })
            }

 


    }, [typeValue, ConditionsValue, bodyPartValue ])




    // console.log(typeValue);

    // console.log(bodyPartValue);

    const changeSearchValue = (value) => {
        setInputSearch(value)
        allPackageHandler({
            params: {

                pageNo: 1,
                pageSize: 20,
                searchQuery: value,
                bodyPartsIds: bodyPartValue ? JSON.stringify((bodyPartValue ?? []).map((item) => { return item.value })) : [],
                conditionIds: ConditionsValue ? JSON.stringify((ConditionsValue ?? []).map((item) => { return item.value })) : [],
            }
        })
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
                                    return <FiltersOnTypeList item={item} key={index} setTypeValue={settypeValue} />
                                })}

                            </div>
                        </div>

                        <hr className='my-4 ' />

                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Body Parts
                            </p>
                            {
                                (getBasicDetailsResponse?.fetching ?
                                    <div className='text-center my-5'>

                                        <Spinner size={"xl"} />
                                    </div>

                                    :

                                    <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                                        {(ListingFields?.BodyPartListing ?? []).map((item, index) => {
                                            return <FiltersList item={item} key={index} setBodyPartValue={setBodyPartValue} />
                                        })}

                                    </div>
                                )
                            }
                        </div>

                        <hr className='my-4 ' />
                        <div>
                            <p style={{ fontSize: '20px', color: '#1e1e2f' }} >
                                Health Conditions
                            </p>
                            {
                                (getBasicDetailsResponse?.fetching ?
                                    <div className='text-center my-5'>

                                        <Spinner size={"xl"} />
                                    </div>

                                    :

                                    <div style={{ maxHeight: '220px', overflowY: 'scroll' }}>
                                        {(ListingFields?.TestConditionListing ?? []).map((item, index) => {
                                            return <FiltersList item={item} key={index} setBodyPartValue={setConditionsValue} />
                                        })}

                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className='col-lg-9 col-md-9 col-sm-12 main-health-package'>
                        <div className='mb-2' style={{ color: '#000', fontSize: '24px', fontWeight: '500' }}>
                            Packages and Tests
                        </div>
                        <div className='mb-3' style={{ color: '#1e1e2f', fontSize: '18px' }}>
                            Showing {(allPackageResponse?.data?.packageList ?? [])?.length + (allPackageResponse?.data?.testList ?? [])?.length} Test & Packages
                        </div>

                        {
                            (allPackageResponse?.fetching ?
                                <div className='text-center my-5'>

                                    <Spinner size={"xl"} />
                                </div>

                                :

                                <div className='row'>
                                    {(allPackageResponse?.data?.packageList ?? []).map((keyValue, index) => {
                                        return <PackageCardDesign listing={keyValue} lg={4} md={4} key={index} />
                                    })}


                                    {(allPackageResponse?.data?.testList ?? []).map((keyValue, index) => {
                                        return <TestCardDesign listing={keyValue} lg={4} md={4} key={index} />
                                    })}



                                </div>
                            )
                        }




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
                    {(item.label)?.charAt(0)?.toUpperCase() + (item.label)?.slice(1)}
                </div>
            </div>

        </div>

    )
}

const FiltersOnTypeList = ({ item, setTypeValue }) => {
    const [FilterCheck, setFilterCheck] = useState();




    return (

        <div className='mx-2'>


            <div className='d-flex '>
                <div ><CheckboxInput
                    check={FilterCheck}
                    setChecked={() => {
                        if (FilterCheck) {
                            setTypeValue(prev => {
                                let data = (prev ?? []).filter((value) => {
                                    if (value.label === item.label) {

                                    }
                                    else {
                                        return value
                                    }
                                })
                                return data

                            });

                        }
                        else {
                            setTypeValue(prev => [...prev, item]);

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
    { label: 'Test', label: 'Test' },




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