import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import cardLabel from './pics/labels/3.png'
import cardLabelSecond from './pics/labels/13.png'
import cardLabelThird from './pics/labels/16.png'


const MediaCard = props => {

    const statusSwitch = param => {
        switch (param) {
            case 1:
                return 'Todo';
            case 2:
                return 'In progress';
            default:
                return 'Done';
        }
    }

    const statusColorSwitch = param => {
        switch (param) {
            case 1:
                return 'error.main';
            case 2:
                return 'secondary';
            default:
                return 'success.main';
        }
    }

    const labelSwitch = param => {
        switch (param) {
            case 1:
                return cardLabel;
            case 2:
                return cardLabelSecond;
            default:
                return cardLabelThird;
        }
    }



    return (
        <Container sx={{ paddingTop: 3 }}>
            <Grid container spacing={4}>
                {props.Tasks.map(tsk => (
                    <Grid item key={tsk.id} xs={12} sm={6} md={4}>
                        <Card key={tsk.id} sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="80"
                                image={labelSwitch(tsk.userId)}
                                alt="back"
                            />
                            <CardContent>
                            {props.Users.filter(user=>user.userId===tsk.userId).map(filteredName=>(
                                <Typography key={filteredName.userId} color='text.secondary' variant='h6' align='right'>
                                {filteredName.userName}
                                </Typography>
                                ))}
                                <Typography color={statusColorSwitch(tsk.statusId)}>
                                    {statusSwitch(tsk.statusId)}
                                </Typography>
                                <Typography multiline="true" gutterBottom variant="h5" component="div">
                                    {tsk.title}
                                </Typography>
                                <Typography multiline="true" variant="body3" color="text.secondary">
                                    {tsk.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <><Button key={tsk.id} onClick={props.onEditItem.bind(this, tsk.id)}>Edit</Button></>
                                <><Button key={tsk.id} onClick={props.onRemoveItem.bind(this, tsk.id)}>Delete</Button></>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MediaCard;