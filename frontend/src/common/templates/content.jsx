import React from 'react'
import '../../styles/scss/content.scss'
import {Switch,Route} from "react-router-dom"
import List from '../../dashboard/tweet-dashboard'
import Graphs from '../../dashboard/tweet-graphs'
import NotFound from './notFound'

function Content(){
    return (
        <main className={"content"}>
            <Switch>
                <Route exact path={"/list"}>
                    <List/>
                </Route>
                <Route exact path={"/"}>
                    <Graphs/>
                </Route>
                <Route path ={"*"}>
                    <NotFound/>
                </Route>
            </Switch>

        </main>

    )
}

export default Content;
