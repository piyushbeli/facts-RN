import * as React from 'react';

// UI
import {FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, ListView, TouchableOpacity} from 'react-native';

// Components
import { ActionButton, HeaderBar } from '@components';

// Interfaces
import { IOutlet } from '@interfaces/outlet';
import { NavigationInjectedProps, ScrollView } from 'react-navigation';

// Props Action
import { connect } from "react-redux";
import { mapDispatchToProps } from '@actions/outlet';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { OutletScreen } from '../OutletScreen/OutletScreen';
import { typos, colors } from '@styles';
import { Categories } from './components/Categories';
import { AdvertisementGridView } from '../AdvertisementScreen/components/AdvertisementGridView';
import { IAdvertisement } from '@interfaces/advertisement';
import { PopularSpecials } from './components/PopularSpecials';

interface IOwnProps {}
type IProps = IOwnProps &
    NavigationInjectedProps &
    IOutlet.StateToProps &
    IOutlet.DispatchFromProps;

interface IState {
    selectedTab: string,
}

const mapStateToProps = function(state: any){
    return {
        outlets: state.outlet.outlets,
        loading: state.outlet.loading ||
            state.shopper.loading ||
            state.advertisement.loading
    }
}

class HomeScreen extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedTab: '',
        };
    }

    onPopularSpecialsItemPress = (advertisement: IAdvertisement.IAdvertisementData) => {
        this.props.navigation.navigate('AdvertisementDetailScreen', { advertisement: advertisement });    
    }
 
    public render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <HeaderBar title={'Home'}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.mainContainer}>
                            

                            {/* OUTLETS */}
                            <View style={[styles.componentWrapper, {marginTop: 30}]}>
                                <View style={styles.row}>
                                    <View style={[styles.flex, {marginBottom: 50}]}>
                                        <Text style={styles.highlight}>OUTLETS</Text>
                                        <Text style={styles.note}>Find your outlets containing shoppers</Text>
                                    </View>
                                    {   this.props.outlets && this.props.outlets.length > 4 &&
                                        <TouchableOpacity activeOpacity={0.9}>
                                            <Text style={styles.seeall}>SEE All</Text>
                                        </TouchableOpacity>                        
                                    }
                                </View>
                            </View>
                            
                            <View style={{marginTop: -30, flex: 1}  }>
                                <OutletScreen onlyOutlets={true}/>
                            </View>

                            {/* POPULAR SPECIALS */}
                            <View style={[styles.componentWrapper, {marginTop: 30}]}>
                                <View style={styles.row}>
                                    <View style={styles.flex}>
                                        <Text style={styles.highlight}>POPULAR SPECIALS</Text>
                                        <Text style={styles.note}>Find what is popular among shoppers</Text>
                                    </View>
                                </View>
                            </View>
                            <PopularSpecials/>        
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "android" ? 0 : -5,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },
    mainContainer: {
        flex: 1
    },
    componentWrapper: {
        paddingHorizontal: 15,        
    },
    row: {
        flexDirection: 'row',
    },
    list: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
    },
    highlight: {
        ...typos.LARGE_TITLE,
        margin: 0,
    },
    note: {
        ...typos.CAPTION,
    },
    seeall: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        ...typos.SMALL_BOLD,
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
    },
    flex: {
        flex: 1
    }
});

const HomeScreenWrapper = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export { HomeScreenWrapper as HomeScreen }