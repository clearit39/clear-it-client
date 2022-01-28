import React from 'react'
import { Card, Typography, CardActions, Button, CardContent } from '@mui/material/';

const TestCards = () => {
    return (
        <>
            <Card sx={{ mt: 3, minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        ClearIt ANY TIME TEST
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} variant="h5" component="div">
                        Give Tests based on different courses
                        choosen by you anytime and get full
                        detailed analysis.
                    </Typography>
                </CardContent>
                <CardActions>
                        <Button size="small">Start Test</Button>
                </CardActions>
            </Card>
            <Card sx={{ mt: 3, minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        ClearIt Scheduled Tests
                    </Typography>
                    <Typography sx={{ fontSize: 18 }} variant="h5" component="div">
                        Give full syllabus Jee Mains & Advanced based
                        Tests with students from all over the India and
                        see your position and analyze mistakes and fill
                        the loopholes.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View Test Schedule</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default TestCards;
