const filters = [
    {   
        key: 1,
        filter: "Sector",
        data : ["IT", "Core", "Finance","Non Tech", "Consultancy"]
    },
    {
        key : 2,
        filter: "Role",
        data :["SDE", "Analyst", "Lead Engineer"]
    },
    {
        key: 3,
        filter: "Company",
        data : ["Amazon", "Microsoft", "Google"]
    }
]

const locations = [
    "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Gurgaon", "Pune"
];
var formComponentObject = {};
const FormComponentObject = () => {
    filters.map((filter) => {
        filter.data.map((data) => {
            formComponentObject = {
                ...formComponentObject,
                [data]: false
            }
        })
    });
};

FormComponentObject();

export default filters;
export { formComponentObject, locations };