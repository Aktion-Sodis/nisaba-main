const surveyData = {
    state: () => ({
        questions: [
            {
                question_id: 1,
                question_text: "Wie geht's?",
                question_answer: "gut",
                question_type: "image",
            },
            {
                question_id: "2abs",
                question_text:
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 3,
                question_text: "Machst du viel Sport?",
                question_answer: "Nein",
                question_type: "chart",
            },
            {
                question_id: 4,
                question_text: "Kannst du schwimmen?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 5,
                question_text: "Kannst du kochen?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 6,
                question_text: "Wie geht's?",
                question_answer: "gut",
                question_type: "text",
            },
            {
                question_id: "2abs",
                question_text: "Trinkst du ausreichend Wasser?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 7,
                question_text: "Machst du viel Sport?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 8,
                question_text: "Kannst du schwimmen?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 9,
                question_text: "Kannst du kochen?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 10,
                question_text: "Wie geht's?",
                question_answer: "gut",
                question_type: "text",
            },
            {
                question_id: "11",
                question_text: "Trinkst du ausreichend Wasser?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 12,
                question_text: "Machst du viel Sport?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 13,
                question_text: "Kannst du schwimmen?",
                question_answer: "Nein",
                question_type: "text",
            },
            {
                question_id: 14,
                question_text: "Kannst du kochen?",
                question_answer: "Nein",
                question_type: "text",
            },
        ],
        interventions: [
            {
            id: 1,
            name: "Kitchen",
            tag: "Technology",
            src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
            surveys: [
                {
                id: 1,
                name: "Survey Kitchen 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 2,
                name: "Survey Kitchen 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 3,
                name: "Survey Kitchen 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 4,
                name: "Survey Kitchen 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
            ],
            },
            {
            id: 2,
            name: "Garden",
            tag: "Technology",
            src: "https://www.thespruce.com/thmb/YDnlBqJp9Z0F-dApUJW9ZgZmI2s=/4711x3141/filters:fill(auto,1)/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg",
            surveys: [
                {
                id: 1,
                name: "Survey Garden 1",
                src: "https://www.thespruce.com/thmb/YDnlBqJp9Z0F-dApUJW9ZgZmI2s=/4711x3141/filters:fill(auto,1)/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg",
                },
                {
                id: 2,
                name: "Survey Garden 2",
                src: "https://www.thespruce.com/thmb/YDnlBqJp9Z0F-dApUJW9ZgZmI2s=/4711x3141/filters:fill(auto,1)/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg",
                },
                {
                id: 3,
                name: "Survey Garden 3",
                src: "https://www.thespruce.com/thmb/YDnlBqJp9Z0F-dApUJW9ZgZmI2s=/4711x3141/filters:fill(auto,1)/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg",
                },
                {
                id: 4,
                name: "Survey Garden 4",
                src: "https://www.thespruce.com/thmb/YDnlBqJp9Z0F-dApUJW9ZgZmI2s=/4711x3141/filters:fill(auto,1)/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg",
                },
            ],
            },
            {
            id: 3,
            name: "Baños",
            tag: "Technology",
            src: "https://blogs.iadb.org/agua/wp-content/uploads/sites/8/2021/02/WSA_BES_BLOG-2.jpg",
            surveys: [
                {
                id: 1,
                name: "Survey Baños 1",
                src: "https://blogs.iadb.org/agua/wp-content/uploads/sites/8/2021/02/WSA_BES_BLOG-2.jpg",
                },
                {
                id: 2,
                name: "Survey Baños 2",
                src: "https://blogs.iadb.org/agua/wp-content/uploads/sites/8/2021/02/WSA_BES_BLOG-2.jpg",
                },
                {
                id: 3,
                name: "Survey Baños 3",
                src: "https://blogs.iadb.org/agua/wp-content/uploads/sites/8/2021/02/WSA_BES_BLOG-2.jpg",
                },
                {
                id: 4,
                name: "Survey Baños 4",
                src: "https://blogs.iadb.org/agua/wp-content/uploads/sites/8/2021/02/WSA_BES_BLOG-2.jpg",
                },
            ],
            },
            {
            id: 4,
            name: "Irgendwas",
            tag: "Education",
            src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
            surveys: [
                {
                id: 1,
                name: "Survey Education 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 2,
                name: "Survey Education 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 3,
                name: "Survey Education 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 4,
                name: "Survey Education 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 5,
                name: "Survey Education 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 6,
                name: "Survey Education 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 7,
                name: "Survey Education 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 8,
                name: "Survey Education 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 9,
                name: "Survey Education 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 10,
                name: "Survey Education 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 11,
                name: "Survey Education 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 12,
                name: "Survey Education 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
            ],
            },
            {
            id: 4,
            name: "Irgendwas",
            tag: "Application",
            src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
            surveys: [
                {
                id: 1,
                name: "Survey Application 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 2,
                name: "Survey Application 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 3,
                name: "Survey Application 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 4,
                name: "Survey Application 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 5,
                name: "Survey Application 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 6,
                name: "Survey Application 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 7,
                name: "Survey Application 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 8,
                name: "Survey Application 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 9,
                name: "Survey Application 1",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 10,
                name: "Survey Application 2",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 11,
                name: "Survey Application 3",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
                {
                id: 12,
                name: "Survey Application 4",
                src: "https://sanito.org/wp-content/uploads/2017/12/Öko-Küchen-2-768x1024.jpg",
                },
            ],
            },
        ],
    }),
}

export default surveyData;