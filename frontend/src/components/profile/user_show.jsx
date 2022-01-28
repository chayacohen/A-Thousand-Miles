import React from 'react';
import '../../assets/css/userShow.scss';

class UserShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: this.props.currentUser.username,
            address: this.props.currentUser.address,
            load: true,
            main: true,
        }
        this.userShowToggle = this.userShowToggle.bind(this);
        // this.userSettings = this.userSettings.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        }

    userShowToggle(){
        this.setState({ main: !this.state.main });
    }

    changeUsername(e){
        this.setState({username: e.target.value})
    }
    changeAddress(e){
        this.setState({address: e.target.value})
    }

    componentDidMount(){
        this.props.getUser(this.props.currentUser.id)
            .then(() => {this.setState({
                load: false,
                username: this.props.user[0].username,
                address: this.props.user[0].address
            })})
    }

    updateUser() {
        this.props.editUser(this.props.currentUser.id, {username: this.state.username, address: this.state.address})
        
        this.userShowToggle();
    }

    
        
    render(){
        if (this.state.load) return (<h1> Loading </h1>);
        
            const {username, email, address} = this.props.user[0]
            const initials = username.split().map(word => word[0]).join().toUpperCase()
            
            if (this.state.main === true) {
                return (
                    <div className='user-main'>
                    <ul className='user-container'>
                        <li><img onClick={() => this.userShowToggle()} src="https://cdn-icons-png.flaticon.com/512/900/900834.png" alt="" /></li>
                        <li className='user-bubble'><h1>{initials}</h1></li>
                        <li>Hi, {username}</li>
                        <li>{email}</li>
                        <li>{address}</li>
                    </ul>
                </div>
                );
            } else {
                return (
                    <div className="user-edit">
                    <ul className='user-container'>
                        <li><img onClick={() => this.userShowToggle()} src="https://cdn-icons-png.flaticon.com/512/900/900834.png" alt="" /></li>
                        <li className='user-bubble'><h1>{initials}</h1></li>
                        <li>Redefine yourself</li>
                        <li><input type="text" value={this.state.username} onChange={this.changeUsername}/></li>
                        <li><input type="text" value={this.state.address} onChange={this.changeAddress}/></li>
                        <li><button onClick={() => this.updateUser()}>Save Changes</button></li>
                    </ul>
                </div>
                );
            }
        }    
};

export default UserShow;