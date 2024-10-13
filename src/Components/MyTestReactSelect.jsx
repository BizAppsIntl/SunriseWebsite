import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

export default function MyTestReactSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [CreatableOptions, setCreatableOptions] = useState([
    { value: '1', label: 'Customer 1', image: '/assets/p1.png' },
    { value: '2', label: 'Customer 2', image: '/assets/p2.png' },
    { value: '3', label: 'Customer 3', image: '/assets/p3.png' },
  ]);

  // ========[ Createable Select  ]=================================
  // Handler for adding a new option when not present in the list
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue, image: null };
    setCreatableOptions([...options, newOption]); // Add the new option to the list
    setSelectedOption(newOption); // Set the new option as the selected value
  };

  const handleGetOptionLabel = (option) => {
    return option.label.includes('1') ? `${option.label} (VIP)` : option.label;
  };

  const handleGetOptionValue = (option) => option.value;
  const customOptions = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
    { value: 'option5', label: 'option5' },
    { value: 'option6', label: 'option6' },
    { value: 'option7', label: 'option7' },
    { value: 'option8', label: 'option8' },
    { value: 'option9', label: 'option9' },
    { value: 'option11', label: 'option11' },
    { value: 'option12', label: 'option12' },
    { value: 'option13', label: 'option13' },
    { value: 'option14', label: 'option14' },
    { value: 'option15', label: 'option15' },
    { value: 'option16', label: 'option16' },
    { value: 'option17', label: 'option17' },
    { value: 'option18', label: 'option18' },
    { value: 'option19', label: 'option19' },
  ]
  // ========[ END  -   Createable Select  ]=================================

  const options = [
    { label: 'Item 1', value: 'Value 1', additionalInfo: 'Extra Info 1 Multan' },
    { label: 'Item 2', value: 'Value 2', additionalInfo: 'Extra Info 2 BWN ' },
    { label: 'Item 3', value: 'Value 3', additionalInfo: 'Extra Info 3 Lahore' },
    { label: 'Item 4', value: 'Value 4', additionalInfo: 'Extra Info 4 Karachi' },
    { label: 'Item 5', value: 'Value 5', additionalInfo: 'Extra Info 4 MTN' },
    { label: 'Item 6', value: 'Value 6', additionalInfo: 'Extra Info 4 Bahawalpur' },
    { label: 'Item 7', value: 'Value 7', additionalInfo: 'Extra Info 4 Dipalpur' },
    { label: 'Item 8', value: 'Value 8', additionalInfo: 'Extra Info 4 Okara' },
    { label: 'Item 9', value: 'Value 9', additionalInfo: 'Extra Info 4 Chishtian' },
    { label: 'Item 10', value: 'Value 10', additionalInfo: 'Extra Info 4 Hasilpur' },
    { label: 'Item 11', value: 'Value 11', additionalInfo: 'Extra Info 4 Islamabad' },
    { label: 'Item 12', value: 'Value 12', additionalInfo: 'Extra Info 4 Peshawar' },
    { label: 'Item 13', value: 'Value 14', additionalInfo: 'Extra Info 4 Malakand' },
    { label: 'Item 15', value: 'Value 15', additionalInfo: 'Extra Info 4 Abbot Abad' },
    { label: 'Item 16', value: 'Value 16', additionalInfo: 'Extra Info 4 Murri' },
    { label: 'Item 17', value: 'Value 17', additionalInfo: 'Extra Info 4 Swat' },
    { label: 'Item 18', value: 'Value 18', additionalInfo: 'Extra Info 4 Qasoor' },
    { label: 'Item 19', value: 'Value 19', additionalInfo: 'Extra Info 4 Attock' },
    { label: 'Item 20', value: 'Value 120', additionalInfo: 'Extra Info 4 Sukkar' },


  ];

  // Custom option component to render options as a table row
  const CustomOption = ({ innerRef, innerProps, data }) => {
    return (
      // <div ref={innerRef} {...innerProps} className="p-2 flex justify-between items-center hover:bg-gray-200">
      //     <span className="w-1/3">{data.label}</span>
      //     <span className="w-1/3">{data.value}</span>
      //     <span className="w-1/3">{data.additionalInfo}</span>
      // </div>
      <div
        ref={innerRef}
        {...innerProps}
        // className="flex justify-between items-center hover:bg-gray-200"
        // style={{ padding: '4px 8px', minHeight: '20px' }} // Reduced padding and height
        className="text-sm py-0 flex justify-between items-center hover:bg-gray-200"
      >
        <span className="w-[10%]">{innerProps.isSelected
          ? (<img className="custom-option__img w-[16px]" src={'/assets/default/Male.png'} alt="" />)
          : (<img className="custom-option__img w-[16px]" src={'/assets/default/Female.png'} alt="" />)}
        </span>
        <span className="w-[20%]">{data.label}</span>
        <span className="w-[20%]">{data.value}</span>
        <span className="w-[50%]">{data.additionalInfo}</span>
      </div>

    );
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '0.5rem',
      width: '100%',
    }),
    menu: (provided) => ({
      ...provided,
      width: '100%',
    }),
  };

  // Custom filter function to search through all fields
  const filterOptions = (option, inputValue) => {
    const { label, value, additionalInfo } = option.data;
    const lowerInput = inputValue.toLowerCase();

    // Search in label, value, and additionalInfo
    return (
      label.toLowerCase().includes(lowerInput) ||
      value.toLowerCase().includes(lowerInput) ||
      additionalInfo?.toLowerCase().includes(lowerInput)
    );
  };

  // Custom styles for react-select to integrate Tailwind CSS classes
  const CustomStyle4ReactSelect = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '22px  !important',
      height: '22px',
      marginTop: '0px',
      // padding: '0.25rem', // Tailwind equivalent: 'p-1'
      padding: '0px',

      width: '100%',
      background: '#fff',
      borderRadius: '0.375rem', // Tailwind equivalent: 'rounded-md'
      //   borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb', // Tailwind: focus:ring-blue-500
      //   borderColor: state.isFocused ? 'red' : 'green', // Tailwind: focus:ring-blue-500
      borderColor: state.isFocused ? 'none' : 'none',
      //   boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none', // Tailwind: focus:ring-blue-500
      boxShadow: state.isFocused ? 'none' : 'none', // Removes blue outline (ring)
      outline: 'none', // Ensures no outline shows

      '&:hover': {
        // borderColor: '#3b82f6' // Tailwind hover effect
        // borderColor: 'red' // Tailwind hover effect
      },

    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: '700px', // Custom dropdown height (Tailwind: 'max-h-52')
      overflowY: 'auto' // Enables scrolling if the content exceeds the height
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e5e7eb' : 'white', // Tailwind equivalent: bg-gray-200 on hover
      color: '#111827', // Tailwind text color: text-gray-900
      padding: '0.5rem 1rem' // Tailwind padding: 'py-2 px-4'
    }),
    //     color: state.isSelected ? '#FFF' : styles.color,
    //     backgroundColor: state.isSelected ? '#60B3D1' : styles.color,
    //     borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
    //     '&:hover': {
    //         color: '#FFF',
    //         backgroundColor: '#60B3D1'
    //     }

    valueContainer: (provided, state) => ({
      ...provided,
      minHeight: '22px  !important',
      height: '22px',
      padding: '0px 6px   !important',
      borderColor: 'white',
      border: 'none',
      boxShadow: 'none',
    }),

    indicatorSeparator: state => ({
      ...state,
      // display: 'none',
      marginTop: '2px',
      marginBottom: '3px',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '22px',
    }),


    // dropdownIndicator: (styles) => ({
    //     ...styles,
    //     paddingTop: 7,
    //     paddingBottom: 7,
    // }),
    // clearIndicator: (styles) => ({
    //     ...styles,
    //     paddingTop: 7,
    //     paddingBottom: 7,
    // }),

    menuPortal: (base) => ({ ...base, zIndex: 9999 }),

    input: (provided) => ({
      ...provided,
      minHeight: '22px  !important',
      height: '22px',
      margin: '0px',
      padding: '0px',
      borderColor: 'white',

      // border: '5px solid red',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      "input:focus": {
        boxShadow: "none",
      },
      '&:focus': {
        boxShadow: 'none',
        outline: 'none',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      boxShadow: 'none',   // Remove box shadow on text
      outline: 'none',     // Remove outline on text
      // border: '2px solid black',      // Remove border around text
      border: 'none',      // Remove border around text
      '&:focus': {
        boxShadow: 'none', // Make sure no focus outline appears
        outline: 'none',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      boxShadow: 'none',   // Remove box shadow on the value container
    }),
    multiValue: (provided) => ({
      ...provided,
      boxShadow: 'none',  // Same for multi-value selected items
      border: 'none',
      outline: 'none',
    }),
  };

  const OptionsWithImages = [
    {
      value: '1',
      label: 'Shoes Sample 1',
      //   label: <div><img src={`/img/src/${color.id}.png`} height="30px" width="30px">{color.name}</div> // Insert an image in this label that I have in a directory, before the name.

      image: 'https://via.placeholder.com/40x40?text=A',
      // {/* //   img: 'ImgFemale', */}
      img: '/assets/p1.png',
    },
    {
      value: '2',
      label: 'Shoes Sample 2',
      image: 'https://via.placeholder.com/40x40?text=B',
      //   img: 'ImgMale',
      img: '/assets/p2.png',
    },
    {
      value: '3',
      label: 'Shoes Sample ',
      image: 'https://via.placeholder.com/40x40?text=C',
      //   img: 'ImgDefault',
      img: '/assets/p3.png',
    },
    {
      value: '4',
      label: 'Shoes Sample 4',
      image: 'https://via.placeholder.com/40x40?text=C',
      //   img: 'ImgDefault',
      img: '/assets/p4.png',
    },
    {
      value: '5',
      label: 'Shoes Sample 5',
      image: 'https://via.placeholder.com/40x40?text=C',
      //   img: 'ImgDefault',
      img: '/assets/p5.png',
    },
    {
      value: '6',
      label: 'Shoes Sample 6',
      image: 'https://via.placeholder.com/40x40?text=C',
      //   img: 'ImgDefault',
      img: '/assets/p6.png',
    },
    {
      value: '7',
      label: 'Shoes Sample 7',
      image: 'https://via.placeholder.com/40x40?text=C',
      //   img: 'ImgDefault',
      img: '/assets/p7.png',
    },
  ];

  // Custom Option component to display image and text in the dropdown
  const CustomOptionWithImages = ({ innerRef, innerProps, data }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center px-2 py-0" >
      <img
        //   src={data.image}
        src={data.img}
        alt={data.label}
        className="w-4 h-4 object-cover rounded-full mr-2"
      />
      <span>{data.label}</span>
    </div>
  );

  // Custom styles for react-select to integrate Tailwind CSS classes
  const CustomStyle4ReactSelectWithImages = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '20px  !important',
      height: '24px !important',

      marginTop: '0px',
      marginBottom: '0px',
      // padding: '0.25rem', // Tailwind equivalent: 'p-1'
      // paddingTop: '-10px !important',
      // padding: '0px !important',

      width: '100%',
      background: '#fff',
      borderRadius: '0.375rem', // Tailwind equivalent: 'rounded-md'
      //   borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb', // Tailwind: focus:ring-blue-500
      //   borderColor: state.isFocused ? 'red' : 'green', // Tailwind: focus:ring-blue-500
      borderColor: state.isFocused ? 'none' : 'none',
      //   boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none', // Tailwind: focus:ring-blue-500
      boxShadow: state.isFocused ? 'none' : 'none', // Removes blue outline (ring)
      outline: 'none', // Ensures no outline shows
      // border: 'none',
      '&:hover': {
        // borderColor: '#3b82f6' // Tailwind hover effect
        // borderColor: 'red' // Tailwind hover effect
      },

    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: '700px', // Custom dropdown height (Tailwind: 'max-h-52')
      overflowY: 'auto' // Enables scrolling if the content exceeds the height
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e5e7eb' : 'white', // Tailwind equivalent: bg-gray-200 on hover
      color: '#111827', // Tailwind text color: text-gray-900
      padding: '0.5rem 1rem' // Tailwind padding: 'py-2 px-4'
    }),
    //     color: state.isSelected ? '#FFF' : styles.color,
    //     backgroundColor: state.isSelected ? '#60B3D1' : styles.color,
    //     borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
    //     '&:hover': {
    //         color: '#FFF',
    //         backgroundColor: '#60B3D1'
    //     }

    valueContainer: (provided, state) => ({
      ...provided,
      minHeight: '22px  !important',
      height: '22px',
      padding: '0px 6px   !important',
      borderColor: 'white',
      border: 'none',
      boxShadow: 'none',
    }),

    indicatorSeparator: state => ({
      ...state,
      // display: 'none',
      marginTop: '2px',
      marginBottom: '3px',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '22px',
    }),


    // dropdownIndicator: (styles) => ({
    //     ...styles,
    //     paddingTop: 7,
    //     paddingBottom: 7,
    // }),
    // clearIndicator: (styles) => ({
    //     ...styles,
    //     paddingTop: 7,
    //     paddingBottom: 7,
    // }),

    menuPortal: (base) => ({ ...base, zIndex: 9999 }),

    input: (provided) => ({
      ...provided,
      minHeight: '22px  !important',
      height: '22px',
      margin: '0px',
      padding: '0px',
      borderColor: 'white',

      // border: '5px solid red',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      "input:focus": {
        boxShadow: "none",
      },
      '&:focus': {
        boxShadow: 'none',
        outline: 'none',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      boxShadow: 'none',   // Remove box shadow on text
      outline: 'none',     // Remove outline on text
      // border: '2px solid black',      // Remove border around text
      border: 'none',      // Remove border around text
      '&:focus': {
        boxShadow: 'none', // Make sure no focus outline appears
        outline: 'none',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      boxShadow: 'none',   // Remove box shadow on the value container
    }),
    multiValue: (provided) => ({
      ...provided,
      boxShadow: 'none',  // Same for multi-value selected items
      border: 'none',
      outline: 'none',
    }),
  };


  // Custom SingleValue component to display the selected image and text in the input box
  const CustomSingleValueWithImages = ({ data }) => (
    <div className="flex items-center">
      <img
        //   src={data.image}
        src={data.img}
        alt={data.label}
        className="w-6 h-6 object-cover rounded-full mr-2"
      />
      <span>{data.label}</span>
    </div>
  );


  return (
    <>
      {/* <div className='w-1/4 mx-auto'> */}
      <div className="max-w-md mx-auto mt-5">

        <div className=" mt-5 w-full">
          Test outline
          <Select
            className="border-0 outline-none"
            options={options}
            // styles={customStyles} // Apply custom styles
            styles={CustomStyle4ReactSelect} // Apply custom styles
            placeholder="Select an option"

          // options={_Patients.Data.map((E, I) => { return ({ key: I, value: Number(E.Id), label: E.Title + ';  ' + E.Id + ';  ' + E.City + ';  ' + E.Phone }) })}

          />
        </div>

        <div className=" mt-5 w-full">
          Test CustomOption with filter
          <Select
            options={options}
            getOptionLabel={(option) => `${option.label}`}
            getOptionValue={(option) => `${option.value}`}
            components={{ Option: CustomOption }}
            styles={customStyles}
            placeholder="Select an option"

            filterOption={filterOptions} // Use the custom filter function

            maxMenuHeight={400}
            // defaultValue={colourOptions[0]}
            // isDisabled={isDisabled}
            // isLoading={isLoading}
            // isClearable={isClearable}
            isClearable={true}
          // isRtl={isRtl}
          // isSearchable={isSearchable}
          // options={colourOptions}
          // styles={customStyles}        
          />

        </div>

        <div className=" mt-5 w-full">
          Test With Images

          <Select
            options={OptionsWithImages}
            // value={{label:<div><img src={'/assets/p1.png'} height="30px" width="30px"/> jello </div>}}
            // value={<div><img src={'/assets/p1.png'} height="30px" width="30px"></img></div>}
            // components={{ Option: CustomOptionWithImages, SingleValue: CustomSingleValueWithImages }}

            getOptionLabel={(option) => {
              // Modify label as needed (e.g., adding "VIP" for certain customers)
              // return option.label.includes('1') ? `${option.label} (VIP)` : option.label;

              // return <div><img src={'/assets/p1.png'} height="30px" width="30px"/> Hello </div>
              return <div className="flex items-center"><img src={option.img} height="30px" width="30px" /> {option.label} </div>
            }}
            components={{ Option: CustomOptionWithImages }}
            placeholder="Select a fruit"
          />


        </div>
      </div>

      <div className="max-w-md mx-auto mt-5">
        Test With Images, Custome Filter and removal of inputBoxBorder

        <Select
          options={OptionsWithImages}
          // value={{label:<div><img src={'/assets/p1.png'} height="30px" width="30px"/> jello </div>}}
          // value={<div><img src={'/assets/p1.png'} height="30px" width="30px"></img></div>}
          // components={{ Option: CustomOptionWithImages, SingleValue: CustomSingleValueWithImages }}

          getOptionLabel={(option) => {
            // Modify label as needed (e.g., adding "VIP" for certain customers)
            // return option.label.includes('1') ? `${option.label} (VIP)` : option.label;

            // return <div><img src={'/assets/p1.png'} height="30px" width="30px"/> Hello </div>
            return (
              <div className="flex items-center p-0 -mt-1">
                {/* <img src={option.img} height="30px" width="30px" /> */}
                <img src={option.img} className='w-4 h-4 border border-red-600' />
                {option.label}, {option.img}
              </div>
            )
          }}

          filterOption={filterOptions} // Use the custom filter function
          components={{ Option: CustomOptionWithImages }}

          styles={CustomStyle4ReactSelectWithImages} // Apply custom styles

          placeholder="Stop to Shop"
        />


      </div>

      <div className="max-w-md mx-auto mt-5">
        Creatable Select List

        <CreatableSelect
          options={CreatableOptions}
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          onCreateOption={handleCreate} // Handle new option creation
          getOptionLabel={handleGetOptionLabel} // Customize label
          getOptionValue={handleGetOptionValue} // Track value
          placeholder="Select or create a customer"
          components={{
            SingleValue: ({ data }) => (
              <div className="flex items-center">
                {data.image && (
                  <img
                    src={data.image}
                    alt={data.label}
                    className="w-6 h-6 object-cover rounded-full mr-2"
                  />
                )}
                <span>{handleGetOptionLabel(data)}</span>
              </div>
            ),
          }}
        />
      </div>

    </>
  )
}

