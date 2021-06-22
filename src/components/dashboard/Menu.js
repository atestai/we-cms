import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import AssessmentIcon from '@material-ui/icons/Assessment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import React, { Component } from 'react'

import { Link } from "react-router-dom";


import lang from '../../language';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.menu = {
            1: [{
                    icon : <DashboardIcon />,
                    name : "Dashboard",
                    href : '/dashboard'
                },{
                    icon : <LocalHospitalIcon />,
                    name : lang.doctors,
                    href : '/doctors'
                },{
                    icon : <GroupIcon />,
                    name : lang.patients,
                    href : '/patients'
                },{
                    icon : <AssessmentIcon />,
                    name : lang.tests,
                    href : '/tests'
                }
            ],

            2: [{
                    icon : <DashboardIcon />,
                    name : "Dashboard",
                    href : '/dashboard'
                },{
                    icon : <GroupIcon />,
                    name : lang.patients,
                    href : '/patients'
                },{
                    icon : <AssessmentIcon />,
                    name : lang.tests,
                    href : '/tests'
                }
            ],

            3: [{
                    icon : <DashboardIcon />,
                    name : "Dashboard",
                    href : '/dashboard'
                },{
                    icon : <AssessmentIcon />,
                    name : "Tests",
                    href : '/tests'
                }
            ]
        }
    }

    render() {

        const list = this.menu[this.props.user.role_id || 1];

        return (

            list.map( (item, index) => {

                return (

                    <ListItem key={index} button component={ Link } to={item.href} variant="contained" title={item.name} >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />                       
                    </ListItem>
                );
            })            
        )
    }
}

export default Menu;