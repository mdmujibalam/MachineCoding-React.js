const commentsData=[
    {
        id:1,
        label:"Did anyone like the post?",
        children:[
            {
                id:9,
                label:"Yes , I liked it"
            },
            {
                id:10,
                label:"No way",
                children:[
                    {
                        id:11,
                        label:"Great Post"
                    }
                ]
            }
        ]
    },
    {
        id:2,
        label:"First Comment",
        children:[
            {
                id:7,
                label:"Second Comment",
                children:[
                    {
                        id:1,
                        label:"No Mine is first comment",
                    }
                ]
            }
        ]
    },
    {
        id:3,
        label:"Please pin it to the top",
        children:[
            {
                id:4,
                label:"Why should we pin it?",
            },
            {
                id:5,
                label:"Is someone going to pin it?"
            },
            {
                id:6,
                label:"Can't agree more"
            }
        ]
    }
];

export default commentsData;