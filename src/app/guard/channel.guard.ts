import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { UtilityService } from '../services/utility.service';

export const channelsResolve: ResolveFn<void> = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const utilityService = inject(UtilityService);
    return utilityService.loadChannels();
};