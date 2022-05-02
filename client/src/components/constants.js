const filters = [
    {
        key: 1,
        filter: "Sector",
        data: ["IT", "Core", "Finance", "Non Tech", "Consultancy"]
    },
    {
        key: 2,
        filter: "Role",
        data: ["SDE", "Analyst", "Lead Engineer"]
    },
    {
        key: 3,
        filter: "Company",
        data: ["Amazon", "Microsoft", "Google"]
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

const posts = [
    {
        companyName: "PhonePe",
        role: "SDE-1",
        costToCompany: "20lpa",
        location: ["Bangalore"],
        yearsOfExperience: 0

    },
    {
        companyName: "Amazon",
        role: "SDE-1",
        costToCompany: "45lpa",
        location: ["Bangalore", "Mumbai", "Hyderabad", "Chennai"],
        yearsOfExperience: 0

    },
    {
        companyName: "Google",
        role: "SDE-1",
        costToCompany: "33lpa",
        location: ["Bangalore", "Hyderabad"],
        yearsOfExperience: 0

    },
    {
        key: 1,
        id: 1,
        companyName: "Microsoft",
        role: "SDE-1",
        costToCompany: "44lpa",
        location: ["Bangalore", "Hyderabad"],
        yearsOfExperience: 0

    }
]
FormComponentObject();

export default filters;
export { formComponentObject, locations, posts };
