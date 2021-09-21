import { TypesOfDepartmentData, TypeOfInput } from '../util/const';

export const departmentDataModel = {
    servicesData: {
        version: 0,
        authorId: '',
        companyId: '',
    },
    publicData: [
        {
            type: TypesOfDepartmentData.FIELD,
            name: 'Department name',
            value: '',
            placeholder: 'City or town where you have a branch',
            valueType: 'none',
            typeOfInput: TypeOfInput.ANY,
            required: true,
        },
        {
            type: TypesOfDepartmentData.SECTION,
            name: 'Rates',
            value: [
                {
                    type: TypesOfDepartmentData.RADIO,
                    name: 'Type of rates',
                    variants: ['cash discount %, extra $/hr for card payment'],
                    value: 'cash discount %',
                    placeholder: 'none',
                    valueType: 'none',
                    typeOfInput: TypeOfInput.ANY,
                    required: false,
                },
                {
                    type: TypesOfDepartmentData.LIST,
                    name: 'Rates List',
                    value: [
                        {
                            type: TypesOfDepartmentData.FIELD,
                            name: 'Name',
                            value: '',
                            placeholder: 'Name of rate',
                            valueType: 'none',
                            typeOfInput: TypeOfInput.ANY,
                            required: true,
                        },
                        {
                            type: TypesOfDepartmentData.FIELD,
                            name: 'Hourly rate for 2 movers',
                            value: '',
                            placeholder: 'ex.99',
                            valueType: '$',
                            typeOfInput: TypeOfInput.NUMBER,
                            required: true,
                        },
                        {
                            type: TypesOfDepartmentData.FIELD,
                            name: 'Discount for CASH PAYMENT',
                            value: '',
                            placeholder: 'ex.10',
                            valueType: '$',
                            typeOfInput: TypeOfInput.NUMBER,
                            required: true,
                        },
                        {
                            type: TypesOfDepartmentData.FIELD,
                            name: 'Hourly rate per extra mover',
                            value: '',
                            placeholder: 'ex.40',
                            valueType: '$',
                            typeOfInput: TypeOfInput.NUMBER,
                            required: true,
                        },
                        {
                            type: TypesOfDepartmentData.FIELD,
                            name: 'Hourly rate per extra truck',
                            value: '',
                            placeholder: 'ex.50',
                            valueType: '$',
                            typeOfInput: TypeOfInput.NUMBER,
                            required: true,
                        }
                    ],
                }
            ],
        },
        {
            type: TypesOfDepartmentData.SECTION,
            name: 'Truck fee',
            value: [
                {
                    type: TypesOfDepartmentData.SELECT,
                    name: 'Calculation method',
                    variants: ['Miles X Factor', 'Mile range'],
                    value: 'Miles X Factor',
                    placeholder: 'none',
                    valueType: 'none',
                    typeOfInput: TypeOfInput.ANY,
                    required: false,
                },
                {
                    type: TypesOfDepartmentData.FIELD,
                    name: 'Truck reservation fee',
                    value: '',
                    placeholder: 'ex. 30',
                    valueType: '$',
                    typeOfInput: TypeOfInput.NUMBER,
                    required: true,
                },
                {
                    type: TypesOfDepartmentData.DOUBLE_FIELD,
                    name: 'Destination fee',
                    values: [
                        {
                            placeholder: 'ex. 160',
                            valueType: '$',
                            value: '',
                            typeOfInput: TypeOfInput.NUMBER,
                            required: true,
                        },
                        {
                            placeholder: 'ex. 140',
                            valueType: 'miles',
                            value: '',
                            typeOfInput: TypeOfInput.NUMBER,
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
};
