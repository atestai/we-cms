import React, { Component } from 'react'
import { withStyles, fade } from '@material-ui/core/styles';

import { Typography, InputBase,Toolbar } from '@material-ui/core';

import { IconButton } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import { DataGrid } from '@material-ui/data-grid';

//import { Link } from "react-router-dom";

import lang from '../../language';



const useStyles = theme => ({

    container: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', minHeight: '82vh' },
    subContainer: { flexGrow: 1, width: '100%' },

    root: {
        flexGrow: 1,
    },

    menuButton: {
        marginRight: theme.spacing(1),
    },

    title: {
        flexGrow: 1,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    }

});



class DatagridPage extends Component {


    render() {

        const { classes } = this.props;

        return (

            <div className={classes.container} >

                <div className={classes.subContainer} >

                    <div className={classes.root}>

                        <Toolbar>
                            <Typography color="primary" component="h2" variant="h6" className={classes.title}>
                                {this.props.title}
                            </Typography>

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder={lang.search}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange ={this.props.onSearch}
                                />
                            </div>

                            {/* <IconButton color="inherit" title={lang.add_element}  component={ Link } to={this.props.baseUrl + '0' } variant="contained"> 
                                <AddCircleIcon />
                            </IconButton> */}

                            <IconButton onClick={this.props.onAdd} color="inherit" title={lang.add_element}>
                                <AddCircleIcon />
                            </IconButton>


                            <IconButton color="inherit" title={lang.delete}>
                                <DeleteIcon />
                            </IconButton>

                            <IconButton onClick={this.props.onReload} color="inherit" title={lang.refresh}>
                                <RefreshIcon />
                            </IconButton>

                        </Toolbar>

                    </div>

                    <div style={{ display: 'flex', height: '80vh' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid 
                                rows={this.props.rows} 
                                columns={this.props.columns} 

                                checkboxSelection
                                disableSelectionOnClick
                                
                                pageSize={25}
                                rowsPerPageOptions={[25]}

                                pagination
                                
                                />
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default withStyles(useStyles)(DatagridPage);
