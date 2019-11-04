import * as React from 'react';
import "./SearchBar.scss"

interface Props {
    searchedText: string;
}

export class SearchBar extends React.Component<Props> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="search-bar-wrapper">
                <div className="search-bar-menu">
                    Adam je hovno
                </div>

                <div className="search-bar">
                    Jirka neni hovno
                </div>

                <div className="search-bar-icons">
                    Kuba je hovno
                </div>
            </div>
        );
    }
}