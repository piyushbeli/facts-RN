import { IOnline } from './online';
import { IOutlet } from './outlet';
import { IAdvertisement } from './advertisement';
import { IShopper } from './shopper';
import { IUser } from './user';
import { IDoc } from './doc';

export interface IReduxState {
  online: IOnline.StateToProps;
  outlets: IOutlet.StateToProps;
  advertisements: IAdvertisement.StateToProps;
  shoppers: IShopper.StateToProps;
  user: IUser.StateToProps;
  doc: IDoc.StateToProps;
}
